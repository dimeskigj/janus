import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant, CreateTenantDto } from '../domain/tenant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private readonly baseUrl = `${environment.apiUrl}/api/tenant`;

  constructor(private http: HttpClient) { }

  getTenantById(id: string): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.baseUrl}/${id}`);
  }

  getTenantsForUser(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.baseUrl);
  }

  createTenant(createTenantDto: CreateTenantDto): Observable<Tenant> {
    return this.http.post<Tenant>(this.baseUrl, createTenantDto);
  }

  updateTenant(tenant: Tenant): Observable<Tenant> {
    return this.http.put<Tenant>(this.baseUrl, tenant);
  }
}