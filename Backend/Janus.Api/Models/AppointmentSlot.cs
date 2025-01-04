using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

public class AppointmentSlot
{
    [Key] public Guid Id { get; init; }
    public int MaximumAppointments { get; init; }
    public int ConfirmedAppointmentCount { get; init; }
    public required IEnumerable<Appointment> Appointments { get; init; }
    public DateTime StartTime { get; init; }
    public DateTime EndTime { get; init; }
    public bool IsRepeating { get; init; }
    public RepeatType RepeatType { get; init; }
    public DateTime RepeatFromDate { get; init; }
    public DateTime RepeatToDate { get; init; }
    public Guid? ParentAppointmentSlotId { get; init; }
    public AppointmentSlot? ParentAppointmentSlot { get; init; }
    public Guid ServiceId { get; set; }
    public Service? Service { get; set; }
}