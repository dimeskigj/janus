using Janus.Api.Features.AppointmentSlot.Domain;
using Janus.Api.Models;

namespace Janus.Api.Features.AppointmentSlot;

public interface IAppointmentSlotService
{
    Task<Models.AppointmentSlot> GetAppointmentSlot(Guid guid);

    Task<List<Models.AppointmentSlot>> GetAppointmentSlotsInDateRange(
        Guid serviceId,
        DateTime startDate,
        DateTime endDate
    );

    Task<Models.AppointmentSlot> CreateAppointmentSlot(CreateAppointmentSlotDto createAppointmentSlotDto);

    Task<Models.AppointmentSlot> UpdateAppointmentSlot(
        Models.AppointmentSlot slot,
        UpdateScope updateScope = UpdateScope.CurrentOnly
    );

    Task DeleteAppointmentSlot(Guid slotId, UpdateScope scope = UpdateScope.CurrentOnly);
}