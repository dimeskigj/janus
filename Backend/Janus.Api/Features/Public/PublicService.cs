using Janus.Api.Database;
using Janus.Api.Features.Public.Domain;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Features.Public;

public class PublicService(AppDbContext context) : IPublicService
{
    public async Task<TenantInformationDto> GetTenantInformationBySlug(string slug)
    {
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Slug == slug);

        if (tenant is null) throw new TenantSlugNotFoundException();

        var services = await context.Services.Where(s => s.TenantId == tenant.Id).ToListAsync();

        return new TenantInformationDto
        {
            Name = tenant.Name,
            Description = tenant.Description,
            IsActive = tenant.IsActive,
            Services = services.Select(s => new ServiceInformationDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description
            })
        };
    }

    public Task<IEnumerable<DateTime>> GetFreeSlotDatesFromServiceInRange(Guid serviceId, DateTime startTime,
        DateTime endTime)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<AppointmentSlotInformationDto>> GetFreeSlotsFromServiceOnDate(Guid serviceId,
        DateTime date)
    {
        var service = await context.Services
            .Include(s => s.DependentServices)
            .FirstOrDefaultAsync(s => s.Id == serviceId);

        if (service is null) throw new ServiceNotFoundException();

        Guid[] allServiceIds = [service.Id, ..service.DependentServices.Select(s => s.Id)];

        var nextDay = date.AddDays(1);
        var now = DateTime.UtcNow;

        var appointmentSlots = await context.AppointmentSlots
            .Where(s => allServiceIds.Contains(s.ServiceId))
            .Where(s => s.StartTime >= date && s.StartTime <= nextDay)
            .Where(s => s.StartTime > now)
            .ToListAsync();

        var appointmentSlotsFromService = appointmentSlots.Where(a => a.ServiceId == serviceId);

        return appointmentSlotsFromService.Where(a => !a.HasOverlap(appointmentSlots)).Select(a =>
            new AppointmentSlotInformationDto
            {
                Id = a.Id,
                StartTime = a.StartTime,
                EndTime = a.EndTime
            });
    }
}