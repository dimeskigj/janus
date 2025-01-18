namespace Janus.Api.Features.Public;

public static class PublicFeature
{
    public static WebApplicationBuilder RegisterPublicServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IPublicService, PublicService>();
        return builder;
    }

    public static WebApplication RegisterPublicEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("api/public").WithTags("Public Endpoints");

        group.MapGet("tenant/{slug}",
                async (string slug, IPublicService publicService) =>
                {
                    var tenantInfo = await publicService.GetTenantInformationBySlug(slug);
                    return Results.Ok(tenantInfo);
                })
            .WithName("Get Tenant Information by Slug");

        return app;
    }
}