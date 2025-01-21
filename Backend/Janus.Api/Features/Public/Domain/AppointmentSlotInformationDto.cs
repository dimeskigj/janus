using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Features.Public.Domain;

public class AppointmentSlotInformationDto
{
    [Key] public Guid Id { get; init; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}