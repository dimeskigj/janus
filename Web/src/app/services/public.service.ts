import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TenantInformationDto } from '../domain/dto';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private readonly baseUrl = `${environment.apiUrl}/api/public`;

  constructor(private http: HttpClient) {}

  getTenantInformationBySlug(slug: string): Observable<TenantInformationDto> {
    return this.http.get<TenantInformationDto>(
      `${this.baseUrl}/tenant/${slug}`,
    );
  }
}
