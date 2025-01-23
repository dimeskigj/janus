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

        group.MapGet("service/{serviceId:guid}/free-slots-dates",
                async (Guid serviceId, DateTime startTime, DateTime endTime, IPublicService publicService) =>
                {
                    var freeSlotDates =
                        await publicService.GetFreeSlotDatesFromServiceInRange(serviceId, startTime, endTime);
                    return Results.Ok(freeSlotDates);
                })
            .WithName("Get Free Slot Dates from Service in Range");

        group.MapGet("service/{serviceId:guid}/free-slots/{date:datetime}",
                async (Guid serviceId, DateTime date, IPublicService publicService) =>
                {
                    var freeSlots = await publicService.GetFreeSlotsFromServiceOnDate(serviceId, date);
                    return Results.Ok(freeSlots);
                })
            .WithName("Get Free Slots from Service on Date");

        return app;
    }
}