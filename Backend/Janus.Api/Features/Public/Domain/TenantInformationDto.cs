namespace Janus.Api.Features.Public.Domain;

public class TenantInformationDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public IEnumerable<ServiceInformationDto> Services { get; set; } = [];
}