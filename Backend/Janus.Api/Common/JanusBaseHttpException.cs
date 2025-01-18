using System.Net;

namespace Janus.Api.Common;

public abstract class JanusBaseHttpException : Exception
{
    public abstract HttpStatusCode HttpStatusCode { get; }
}