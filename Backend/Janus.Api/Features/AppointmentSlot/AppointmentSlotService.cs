using Janus.Api.Database;
using Janus.Api.Features.AppointmentSlot.Domain;
using Janus.Api.Features.Service;
using Janus.Api.Features.Tenant;
using Janus.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Features.AppointmentSlot;

public class AppointmentSlotService(AppDbContext context) : IAppointmentSlotService
{
    public async Task<Models.AppointmentSlot> GetAppointmentSlot(Guid guid)
    {
        var slot = await context.AppointmentSlots.FirstOrDefaultAsync(s => s.Id == guid);

        if (slot is null) throw new AppointmentSlotNotFoundException();

        return slot;
    }

    public async Task<List<Models.AppointmentSlot>> GetAppointmentSlotsInDateRange(
        Guid serviceId,
        DateTime startDate,
        DateTime endDate
    )
    {
        var service = await context.Services
            .Include(service => service.Tenant)
            .FirstOrDefaultAsync(s => s.Id == serviceId);

        if (service is null) throw new ServiceNotFoundException();

        if (!(service.Tenant?.IsUserPartOfTenant(context.UserEmail) ?? false))
        {
            throw new NoAccessToTenantException();
        }

        var slots = await context.AppointmentSlots
            .Where(s => s.ServiceId == serviceId && s.StartTime >= startDate && s.EndTime <= endDate)
            .ToListAsync();

        return slots;
    }

    public async Task<Models.AppointmentSlot> CreateAppointmentSlot(CreateAppointmentSlotDto createAppointmentSlotDto)
    {
        var service = await context.Services
            .Include(s => s.Tenant)
            .FirstOrDefaultAsync(s => s.Id == createAppointmentSlotDto.ServiceId);

        if (!(service?.Tenant?.IsUserPartOfTenant(context.UserEmail) ?? false))
        {
            throw new NoAccessToTenantException();
        }

        var appointmentSlot = createAppointmentSlotDto.ToAppointmentSlot();

        if (appointmentSlot.IsRepeating && appointmentSlot.RepeatToDate >
            appointmentSlot.RepeatFromDate.AddYears(1).AddDays(1))
        {
            throw new InvalidAppointmentSlotCreationRequestException();
        }

        var slotEntry = context.AppointmentSlots.Add(appointmentSlot);

        await context.SaveChangesAsync();

        context.AppointmentSlots.AddRange(slotEntry.Entity.CreateAppointmentSlotChildren());

        await context.SaveChangesAsync();

        return slotEntry.Entity;
    }

    public async Task<Models.AppointmentSlot> UpdateAppointmentSlot(
        Models.AppointmentSlot slot,
        UpdateScope updateScope = UpdateScope.CurrentOnly
    )
    {
        var dbSlot = await context.AppointmentSlots
            .Include(a => a.Service)
            .ThenInclude(s => s!.Tenant)
            .FirstOrDefaultAsync(s => s.Id == slot.Id);

        if (dbSlot is null) throw new AppointmentSlotNotFoundException();

        if (!(dbSlot.Service?.Tenant?.IsUserPartOfTenant(context.UserEmail) ?? false))
        {
            throw new NoAccessToTenantException();
        }

        if (dbSlot.IsRepeating && updateScope != UpdateScope.CurrentOnly)
        {
            var parentSlotId = dbSlot.ParentAppointmentSlotId ?? dbSlot.Id;

            var relatedSlots = await context.AppointmentSlots
                .Where(a => a.Id != dbSlot.Id)
                .Where(a => a.Id == parentSlotId || a.ParentAppointmentSlotId == parentSlotId)
                .Where(a => updateScope == UpdateScope.All || a.StartTime > dbSlot.StartTime)
                .ToListAsync();

            foreach (var relatedSlot in relatedSlots)
            {
                relatedSlot.StartTime = relatedSlot.StartTime.Add(slot.StartTime - dbSlot.StartTime);
                relatedSlot.EndTime = relatedSlot.EndTime.Add(slot.EndTime - dbSlot.EndTime);
                relatedSlot.MaximumAppointments = slot.MaximumAppointments;
            }
        }

        dbSlot.StartTime = slot.StartTime;
        dbSlot.EndTime = slot.EndTime;
        dbSlot.MaximumAppointments = slot.MaximumAppointments;

        await context.SaveChangesAsync();

        return dbSlot;
    }

    public async Task DeleteAppointmentSlot(Guid slotId, UpdateScope scope = UpdateScope.CurrentOnly)
    {
        var dbSlot = await context.AppointmentSlots
            .Include(a => a.Service)
            .ThenInclude(s => s!.Tenant)
            .FirstOrDefaultAsync(s => s.Id == slotId);

        if (dbSlot is null) throw new AppointmentSlotNotFoundException();

        if (!(dbSlot.Service?.Tenant?.IsUserPartOfTenant(context.UserEmail) ?? false))
        {
            throw new NoAccessToTenantException();
        }

        var isAParentSlot = dbSlot is { IsRepeating: true, ParentAppointmentSlotId: null };

        switch (scope)
        {
            case UpdateScope.CurrentOnly:
                if (isAParentSlot)
                {
                    var childrenSlots = await context.AppointmentSlots
                        .OrderBy(a => a.StartTime)
                        .Where(a => a.ParentAppointmentSlotId == dbSlot.Id)
                        .ToListAsync();

                    var oldestChild = childrenSlots.FirstOrDefault();

                    childrenSlots
                        .Where(slot => slot.Id != oldestChild?.Id)
                        .ToList()
                        .ForEach(slot => slot.ParentAppointmentSlotId = oldestChild?.Id);

                    await context.SaveChangesAsync();
                }

                context.Remove(dbSlot);
                await context.SaveChangesAsync();

                break;
            case UpdateScope.AllFuture:
            case UpdateScope.All:
                var parentSlotId = dbSlot.ParentAppointmentSlotId ?? dbSlot.Id;

                var toBeDeleted = await context.AppointmentSlots
                    .Where(a => a.Id != dbSlot.Id)
                    .Where(a => a.ParentAppointmentSlotId == parentSlotId || a.Id == parentSlotId)
                    .Where(a => scope == UpdateScope.All || a.StartTime > dbSlot.StartTime)
                    .ToListAsync();

                context.RemoveRange([..toBeDeleted, dbSlot]);
                await context.SaveChangesAsync();

                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(scope), scope, null);
        }

        await context.SaveChangesAsync();
    }
}