using Janus.Api.Common;

namespace Janus.Api.Middlewares;

using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

public class ExceptionHandlingMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (JanusBaseHttpException baseHttpException)
        {
            await HandleExceptionAsync(context, baseHttpException);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, JanusBaseHttpException baseHttpException)
    {
        var response = new
        {
            StatusCode = baseHttpException.HttpStatusCode,
            Message = baseHttpException.GetType().Name
        };

        context.Response.StatusCode = (int)baseHttpException.HttpStatusCode;
        
        return context.Response.WriteAsJsonAsync(response);
    }
}