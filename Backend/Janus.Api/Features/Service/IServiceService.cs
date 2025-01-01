using Janus.Api.Models;

namespace Janus.Api.Features.Service;

public interface IServiceService
{
    Task<Models.Service> GetService(Guid guid);
    Task<List<Models.Service>> GetServicesForTenant(Guid tenantId);
    Task<Models.Service> CreateService(CreateServiceDto createServiceDto);
    Task<Models.Service> UpdateService(Models.Service service);
}