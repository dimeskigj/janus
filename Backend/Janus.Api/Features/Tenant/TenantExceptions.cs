using System.Net;
using Janus.Api.Common;

namespace Janus.Api.Features.Tenant;

public class TenantNotFoundException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}

public class NoAccessToTenantException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.Unauthorized;
}

public class InvalidRequestForTenantCreationException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
}