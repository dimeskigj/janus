using Janus.Api.Models;

namespace Janus.Api.Features.Tenant;

public interface ITenantService
{
    Task<Models.Tenant> GetTenant(Guid guid);
    Task<IEnumerable<Models.Tenant>> GetTenantsForUser();
    Task<Models.Tenant> CreateTenant(CreateTenantDto createTenantDto);
    Task<Models.Tenant> UpdateTenant(Models.Tenant tenant);
}