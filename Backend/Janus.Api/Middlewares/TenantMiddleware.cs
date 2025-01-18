using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Nodes;
using Janus.Api.Database;

namespace Janus.Api.Middlewares;

public class TenantMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var requestTenantId = context.Request.Headers["T-TenantId"].FirstOrDefault();
        var isAuthenticated = context.User.Identity?.IsAuthenticated ?? false;

        var email = GetUserEmail(context);

        var dbContext = context.RequestServices.GetRequiredService<AppDbContext>();
        dbContext.UserEmail = email;

        if (requestTenantId is null || !isAuthenticated)
        {
            await next(context);
            return;
        }

        if (email is null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized.");
            return;
        }

        dbContext.TenantId = Guid.Parse(requestTenantId);

        var userHasAccessToTenant =
            dbContext.Tenants
                .FirstOrDefault(t => t.Id == dbContext.TenantId)?
                .Users.Contains(email) ?? false;

        if (!userHasAccessToTenant)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized.");
            return;
        }

        await next(context);
    }

    private static string? GetUserEmail(HttpContext context)
    {
        var firebaseClaimJson = context.User.FindFirstValue("firebase");
        var firebaseClaim = JsonSerializer.Deserialize<JsonObject>(firebaseClaimJson ?? "null");

        if (!(firebaseClaim?.TryGetPropertyValue("identities", out var identities) ?? false)) return null;
        if (!(identities?.AsObject().TryGetPropertyValue("email", out var emails) ?? false)) return null;
        return emails?.AsArray().Count != 0 ? emails?.AsArray().First()?.ToString() : null;
    }
}