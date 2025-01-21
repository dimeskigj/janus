using Janus.Api.Features.AppointmentSlot.Domain;
using Janus.Api.Models;

namespace Janus.Api.Features.AppointmentSlot;

public static class AppointmentSlotFeature
{
    public static WebApplicationBuilder RegisterAppointmentSlotServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IAppointmentSlotService, AppointmentSlotService>();
        return builder;
    }

    public static WebApplication RegisterAppointmentSlotEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("api/appointmentslot").RequireAuthorization()
            .WithTags("Appointment Slot Endpoints");

        group.MapGet("{id:guid}",
                async (Guid id, IAppointmentSlotService appointmentSlotService) =>
                {
                    var slot = await appointmentSlotService.GetAppointmentSlot(id);
                    return Results.Ok(slot);
                })
            .WithName("Get Appointment Slot by Id");

        group.MapGet("service/{serviceId:guid}",
                async (Guid serviceId, DateTime startDate, DateTime endDate,
                    IAppointmentSlotService appointmentSlotService) =>
                {
                    var slots = await appointmentSlotService.GetAppointmentSlotsInDateRange(
                        serviceId, startDate, endDate
                    );

                    return Results.Ok(slots);
                })
            .WithName("Get Appointment Slots in Date Range");

        group.MapPost("",
                async (CreateAppointmentSlotDto createDto, IAppointmentSlotService appointmentSlotService) =>
                {
                    var createdSlot = await appointmentSlotService.CreateAppointmentSlot(createDto);
                    return Results.Ok(createdSlot);
                })
            .WithName("Create Appointment Slot");

        group.MapPut("",
                async (Models.AppointmentSlot slot, UpdateScope scope,
                    IAppointmentSlotService appointmentSlotService) =>
                {
                    var updatedSlot = await appointmentSlotService.UpdateAppointmentSlot(slot, scope);
                    return Results.Ok(updatedSlot);
                })
            .WithName("Update Appointment Slot");

        group.MapDelete("{id:guid}",
                async (Guid id, UpdateScope scope, IAppointmentSlotService appointmentSlotService) =>
                {
                    await appointmentSlotService.DeleteAppointmentSlot(id, scope);
                    return Results.NoContent();
                })
            .WithName("Delete Appointment Slot");

        return app;
    }
}