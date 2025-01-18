using Janus.Api.Models;

namespace Janus.Api.Features.Service;

public static class ServiceFeature
{
    public static WebApplicationBuilder RegisterServiceServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IServiceService, ServiceService>();
        return builder;
    }

    public static WebApplication RegisterServiceEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("api/service").RequireAuthorization()
            .WithTags("Service Endpoints");

        group.MapGet("{id:guid}",
                async (Guid id, IServiceService serviceService) =>
                {
                    var service = await serviceService.GetService(id);
                    return Results.Ok(service);
                })
            .WithName("Get Service by Id");

        group.MapGet("tenant/{tenantId:guid}",
                async (Guid tenantId, IServiceService serviceService) =>
                {
                    var services = await serviceService.GetServicesForTenant(tenantId);
                    return Results.Ok(services);
                })
            .WithName("Get Services for Tenant");

        group.MapPost("",
                async (CreateServiceDto createServiceDto, IServiceService serviceService) =>
                {
                    var createdService = await serviceService.CreateService(createServiceDto);
                    return Results.Ok(createdService);
                })
            .WithName("Create Service");

        group.MapPut("",
                async (Models.Service service, IServiceService serviceService) =>
                {
                    var updatedService = await serviceService.UpdateService(service);
                    return Results.Ok(updatedService);
                })
            .WithName("Update Service");

        return app;
    }
}