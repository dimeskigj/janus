using Janus.Api.Models;

namespace Janus.Api.Features.Tenant;

public static class TenantFeature
{
    public static WebApplicationBuilder RegisterTenantServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ITenantService, TenantService>();
        return builder;
    }

    public static WebApplication RegisterTenantEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("api/tenant").RequireAuthorization()
            .WithTags("Tenant Endpoints");

        group.MapGet("{id:guid}",
                async (Guid id, ITenantService tenantService) =>
                {
                    var tenant = await tenantService.GetTenant(id);
                    return Results.Ok(tenant);
                })
            .WithName("Get Tenant by Id");

        group.MapGet("", async (ITenantService tenantService) => Results.Ok(await tenantService.GetTenantsForUser()))
            .WithName("Get Tenants for User");

        group.MapPost("",
                async (CreateTenantDto createTenantDto, ITenantService tenantService) =>
                {
                    var createdTenant = await tenantService.CreateTenant(createTenantDto);
                    return Results.Ok(createdTenant);
                })
            .WithName("Create Tenant");

        group.MapPut("",
                async (Models.Tenant tenant, ITenantService tenantService) =>
                {
                    var updatedTenant = await tenantService.UpdateTenant(tenant);
                    return Results.Ok(updatedTenant);
                })
            .WithName("Update Tenant");

        return app;
    }
}