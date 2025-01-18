using Janus.Api.Features.Public.Domain;

namespace Janus.Api.Features.Public;

public interface IPublicService
{
    Task<TenantInformationDto> GetTenantInformationBySlug(string slug);
}