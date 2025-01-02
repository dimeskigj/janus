using Janus.Api.Database;
using Janus.Api.Features.Public.Domain;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Features.Public;

public class PublicService(AppDbContext context) : IPublicService
{
    public async Task<TenantInformationDto> GetTenantInformationBySlug(string slug)
    {
        var tenant = await context.Tenants.FirstOrDefaultAsync(t => t.Slug == slug);

        if (tenant is null) throw new TenantSlugNotFound();

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
}