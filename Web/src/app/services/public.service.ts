import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TenantInformationDto, AppointmentSlotInformationDto } from '../domain/dto';

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

  getFreeSlotDatesFromServiceInRange(
    serviceId: string,
    startTime: Date,
    endTime: Date,
  ): Observable<Date[]> {
    const params = new HttpParams()
      .set('startTime', startTime.toISOString())
      .set('endTime', endTime.toISOString());

    return this.http.get<Date[]>(
      `${this.baseUrl}/service/${serviceId}/free-slots-dates`,
      { params },
    );
  }

  getFreeSlotsFromServiceOnDate(
    serviceId: string,
    date: Date,
  ): Observable<AppointmentSlotInformationDto[]> {
    return this.http.get<AppointmentSlotInformationDto[]>(
      `${this.baseUrl}/service/${serviceId}/free-slots/${date.toISOString()}`,
    );
  }
}
