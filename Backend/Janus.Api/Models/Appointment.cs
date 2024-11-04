using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

public class Appointment
{
    [Key] public Guid Id { get; init; }
    public Guid AppointmentSlotId { get; init; }
    public required AppointmentSlot AppointmentSlot { get; init; }
    [MaxLength(100)] public required string Email { get; init; }
    [MaxLength(100)] public required string Phone { get; init; }
    [MaxLength(100)] public required string Name { get; init; }
    public bool IsConfirmed { get; init; }
    public bool IsCanceled { get; init; }
}