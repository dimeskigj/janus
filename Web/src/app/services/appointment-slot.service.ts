import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AppointmentSlot,
  CreateAppointmentSlotDto,
} from '../domain/appointment-slot';
import { UpdateScope } from '../domain/dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSlotService {
  private readonly apiUrl = `${environment.apiUrl}/api/appointmentslot`;

  constructor(private http: HttpClient) {}

  getAppointmentSlot(id: string): Observable<AppointmentSlot> {
    return this.http.get<AppointmentSlot>(`${this.apiUrl}/${id}`);
  }

  getAppointmentSlotsInDateRange(
    serviceId: string,
    startDate: Date,
    endDate: Date
  ): Observable<AppointmentSlot[]> {
    return this.http.get<AppointmentSlot[]>(
      `${this.apiUrl}/service/${serviceId}`,
      {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      }
    );
  }

  createAppointmentSlot(
    dto: CreateAppointmentSlotDto
  ): Observable<AppointmentSlot> {
    return this.http.post<AppointmentSlot>(this.apiUrl, dto);
  }

  updateAppointmentSlot(
    slot: AppointmentSlot,
    scope: UpdateScope
  ): Observable<AppointmentSlot> {
    return this.http.put<AppointmentSlot>(this.apiUrl, { ...slot, scope });
  }

  deleteAppointmentSlot(id: string, scope: UpdateScope): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      params: { scope },
    });
  }
}
