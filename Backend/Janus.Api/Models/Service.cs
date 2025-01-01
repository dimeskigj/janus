using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

public class Service
{
    [Key] public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; set; }
    [MaxLength(2000)] public required string Description { get; set; }
    public Guid TenantId { get; init; }
    public Tenant? Tenant { get; init; }
    public required IEnumerable<Service> DependentServices { get; set; }
}

// ReSharper disable once ClassNeverInstantiated.Global
public class CreateServiceDto(string name, string description)
{
    public string Name { get; } = name;
    public string Description { get; } = description;
    public Service ToService(Guid tenantId)
    {
        return new Service
        {
            Name = Name,
            Description = Description,
            TenantId = tenantId,
            DependentServices = []
        };
    }
}