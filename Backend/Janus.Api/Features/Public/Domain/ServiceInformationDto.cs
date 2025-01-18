namespace Janus.Api.Features.Public.Domain;

public class ServiceInformationDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}