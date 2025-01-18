export interface Tenant {
    id: string;
    name: string;
    slug: string;
    ownerEmail: string;
    users: string[];
    description: string;
    blacklist: string[];
    createdAt: Date;
    isActive: boolean;
}

export interface CreateTenantDto {
    name: string;
    description: string;
}
