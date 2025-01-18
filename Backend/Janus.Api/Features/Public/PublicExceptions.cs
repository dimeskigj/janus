using System.Net;
using Janus.Api.Common;

namespace Janus.Api.Features.Public;

public class TenantSlugNotFound : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}