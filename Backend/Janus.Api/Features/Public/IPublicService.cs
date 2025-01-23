using Janus.Api.Features.Public.Domain;

namespace Janus.Api.Features.Public;

public interface IPublicService
{
    Task<TenantInformationDto> GetTenantInformationBySlug(string slug);

    Task<IEnumerable<DateTime>>
        GetFreeSlotDatesFromServiceInRange(Guid serviceId, DateTime startTime, DateTime endTime);

    Task<IEnumerable<AppointmentSlotInformationDto>> GetFreeSlotsFromServiceOnDate(Guid serviceId, DateTime date);
}