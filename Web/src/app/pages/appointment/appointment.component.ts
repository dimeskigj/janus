import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AppointmentSlotInformationDto } from '../../domain/dto';
import { PublicService } from '../../services/public.service';
import { getTodayAsDate, removeHours } from '../../utils/date-time-utils';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SortPipe } from '../../pipes/sort.pipe';

@Component({
  selector: 'app-appointment',
  imports: [
    AsyncPipe,
    DatePipe,
    SortPipe,
    MatButtonModule,
    MatDatepickerModule,
    MatRippleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent implements OnInit, OnDestroy {
  selectedDate$ = new BehaviorSubject<Date>(getTodayAsDate());
  destroyed$ = new Subject<void>();
  freeAppointmentSlots$?: Observable<AppointmentSlotInformationDto[]>;
  isLoading = true;
  serviceId = '';
  today = getTodayAsDate();

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.freeAppointmentSlots$ = this.selectedDate$.pipe(
      debounceTime(500),
      tap(() => (this.isLoading = true)),
      switchMap((data) =>
        this.publicService.getFreeSlotsFromServiceOnDate(this.serviceId, data),
      ),
      tap(() => (this.isLoading = false)),
    );

    this.route.paramMap
      .pipe(
        switchMap((params) => of(params.get('serviceId')!)),
        takeUntil(this.destroyed$),
      )
      .subscribe({ next: (value) => (this.serviceId = value) });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSelectedDateChange(date: Date): void {
    this.selectedDate$.next(removeHours(date));
  }
}
