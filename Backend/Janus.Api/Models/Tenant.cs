using System.ComponentModel.DataAnnotations;
using Janus.Api.Common;

namespace Janus.Api.Models;

public class Tenant
{
    [Key] public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; set; }
    [MaxLength(110)] public required string Slug { get; init; }
    [MaxLength(100)] public required string OwnerEmail { get; init; }
    public required List<string> Users { get; set; }
    [MaxLength(2000)] public required string Description { get; set; }
    public required List<string> Blacklist { get; set; }
    public DateTime CreatedAt { get; init; }
    public bool IsActive { get; set; }
}

// ReSharper disable once ClassNeverInstantiated.Global
public class CreateTenantDto(
    string name,
    string description
)
{
    public required string Name { get; init; } = name;
    public required string Description { get; init; } = description;

    public Tenant ToTenant(string ownerEmail)
    {
        return new Tenant
        {
            Name = Name,
            Slug = Slugifier.Slugify(Name),
            Description = Description,
            OwnerEmail = ownerEmail,
            Users = [ownerEmail],
            Blacklist = [],
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };
    }
}