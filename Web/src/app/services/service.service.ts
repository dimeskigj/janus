import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateServiceDto, Service } from '../domain/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly baseUrl = `${environment.apiUrl}/api/service`;

  constructor(private http: HttpClient) {}

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  getServicesForTenant(tenantId: string): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/tenant/${tenantId}`);
  }

  createService(createServiceDto: CreateServiceDto): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, createServiceDto);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(this.baseUrl, service);
  }
}
