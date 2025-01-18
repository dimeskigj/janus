using Janus.Api.Database;
using Janus.Api.Features.Tenant;
using Janus.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Features.Service;

public class ServiceService(AppDbContext context) : IServiceService
{
    public async Task<Models.Service> GetService(Guid guid)
    {
        var service = await context.Services.FirstOrDefaultAsync(s => s.Id == guid);

        if (service is null) throw new ServiceNotFoundException();

        return service;
    }

    public async Task<List<Models.Service>> GetServicesForTenant(Guid tenantId)
    {
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);

        if (tenant is null) throw new TenantNotFoundException();

        var services = await context.Services.Where(s => s.TenantId == tenantId).ToListAsync();

        return services;
    }

    public async Task<Models.Service> CreateService(CreateServiceDto createServiceDto)
    {
        if (context.TenantId == default) throw new InvalidServiceCreationRequestException(); 
        
        var serviceEntry = context.Services.Add(createServiceDto.ToService(context.TenantId));

        await context.SaveChangesAsync();

        return serviceEntry.Entity;
    }

    public async Task<Models.Service> UpdateService(Models.Service service)
    {
        var dbService = await context.Services
            .FirstOrDefaultAsync(s => s.Id == service.Id && s.TenantId == context.TenantId);

        if (dbService is null) throw new ServiceNotFoundException();

        dbService.Name = service.Name;
        dbService.Description = service.Description;
        dbService.DependentServices = service.DependentServices;
        
        await context.SaveChangesAsync();

        return dbService;
    }
}