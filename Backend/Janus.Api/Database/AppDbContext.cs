using Janus.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Database;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public Guid TenantId { get; set; }
    public string UserEmail { get; set; } = string.Empty;

    public DbSet<Appointment> Appointments { get; init; }
    public DbSet<AppointmentSlot> AppointmentSlots { get; init; }
    public DbSet<Service> Services { get; init; }
    public DbSet<Tenant> Tenants { get; init; }
}