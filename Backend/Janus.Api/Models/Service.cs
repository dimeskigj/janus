using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

public class Service
{
    [Key] public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; init; }
    [MaxLength(2000)] public required string Description { get; init; }
    public Guid TenantId { get; init; }
    public Tenant? Tenant { get; init; }
    public required IEnumerable<Service> DependentServices { get; init; }
}