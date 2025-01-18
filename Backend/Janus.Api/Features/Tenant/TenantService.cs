using Janus.Api.Database;
using Janus.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Features.Tenant;

public class TenantService(AppDbContext context) : ITenantService
{
    public async Task<Models.Tenant> GetTenant(Guid id)
    {
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Id == id);

        if (tenant is null) throw new TenantNotFoundException();

        if (context.UserEmail != null && !tenant.Users.Contains(context.UserEmail))
            throw new NoAccessToTenantException();

        return tenant;
    }

    public async Task<IEnumerable<Models.Tenant>> GetTenantsForUser()
    {
        var tenants = await context.Tenants
            .Where(t => t.Users.Contains(context.UserEmail ?? string.Empty))
            .ToListAsync();
        
        return tenants;
    }

    public async Task<Models.Tenant> CreateTenant(CreateTenantDto createTenantDto)
    {
        var userEmail = context.UserEmail ?? throw new InvalidRequestForTenantCreationException();

        var tenantEntry = context.Tenants.Add(createTenantDto.ToTenant(userEmail));

        await context.SaveChangesAsync();

        return tenantEntry.Entity;
    }

    public async Task<Models.Tenant> UpdateTenant(Models.Tenant tenant)
    {
        var dbTenant = await GetTenant(tenant.Id);

        dbTenant.Users = tenant.Users;
        dbTenant.Name = tenant.Name;
        dbTenant.Description = tenant.Description;
        dbTenant.Blacklist = tenant.Blacklist;

        await context.SaveChangesAsync();

        return dbTenant;
    }
}