using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

public class Tenant
{
    [Key] public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; init; }
    [MaxLength(110)] public required string Slug { get; init; }
    [MaxLength(100)] public required string OwnerEmail { get; init; }
    public required IEnumerable<string> Users { get; init; }
    [MaxLength(2000)] public required string Description { get; init; }
    public required IEnumerable<string> Blacklist { get; init; }
}