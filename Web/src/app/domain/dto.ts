export interface TenantInformationDto {
  name: string;
  description: string;
  isActive: boolean;
  services: ServiceInformationDto[];
}

export interface ServiceInformationDto {
  id: string;
  name: string;
  description: string;
}
