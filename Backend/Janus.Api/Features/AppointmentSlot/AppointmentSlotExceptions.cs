using System.Net;
using Janus.Api.Common;

namespace Janus.Api.Features.AppointmentSlot;

public class AppointmentSlotNotFoundException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
}

public class InvalidAppointmentSlotCreationRequestException : JanusBaseHttpException
{
    public override HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
}