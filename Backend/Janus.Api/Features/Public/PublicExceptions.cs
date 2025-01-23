using System.Net;
using Janus.Api.Common;

namespace Janus.Api.Features.Public;

public class TenantSlugNotFoundException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}

public class ServiceNotFoundException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}