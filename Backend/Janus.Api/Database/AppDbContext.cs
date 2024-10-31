using Microsoft.EntityFrameworkCore;

namespace Janus.Api.Database;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public Guid TenantId { get; set; }
}