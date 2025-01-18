import { Tenant } from "./tenant";

export interface Service {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  tenant?: Tenant;
  dependentServices: Service[];
}

export interface CreateServiceDto {
  name: string;
  description: string;
}
