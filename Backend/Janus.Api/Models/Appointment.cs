using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Janus.Api.Models;

public class Appointment
{
    [Key] public Guid Id { get; init; }
    public Guid AppointmentSlotId { get; init; }
    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int AppointmentNumber { get; init; }

    public required AppointmentSlot AppointmentSlot { get; init; }
    [MaxLength(100)] public required string Email { get; init; }
    [MaxLength(100)] public required string Phone { get; init; }
    [MaxLength(100)] public required string Name { get; init; }
    [MaxLength(1000)] public required string Notes { get; init; }
    public bool IsConfirmed { get; init; }
    public bool IsCanceled { get; init; }
    [MaxLength(5)] public string LanguageCode { get; set; } = "en";
}