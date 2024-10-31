using System.Security.Claims;
using Janus.Api.Database;

namespace Janus.Api.Middlewares;

public class TenantMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var requestTenantId = context.Request.Headers["T-TenantId"].FirstOrDefault();
        var isAuthenticated = context.User.Identity?.IsAuthenticated ?? false;

        if (requestTenantId is null || !isAuthenticated)
        {
            await next(context);
            return;
        }

        var userEmail = context.User.FindFirstValue("email");

        if (userEmail is null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized.");
            return;
        }

        // TODO: Verify the userEmail has access to the specific Tenant 

        var dbContext = context.RequestServices.GetRequiredService<AppDbContext>();
        dbContext.TenantId = Guid.Parse(requestTenantId);

        await next(context);
    }
}