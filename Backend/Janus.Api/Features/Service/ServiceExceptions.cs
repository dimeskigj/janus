using System.Net;
using Janus.Api.Common;

namespace Janus.Api.Features.Service;

public class ServiceNotFoundException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}

public class InvalidServiceCreationRequestException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
}