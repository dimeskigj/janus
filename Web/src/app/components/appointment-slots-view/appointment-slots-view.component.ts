import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subscription, debounceTime, finalize } from 'rxjs';
import { addDaysToDate, getTodayAsDate } from '../../utils/date-time-utils';
import { AppointmentSlot } from '../../domain/appointment-slot';
import { AppointmentSlotService } from '../../services/appointment-slot.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../dialogs/calendar-dialog/calendar-dialog.component';
import { NewAppointmentSlotDialogComponent } from '../dialogs/new-appointment-slot-dialog/new-appointment-slot-dialog.component';

@Component({
    selector: 't-appointment-slots-view',
    imports: [MatIconModule, MatButtonModule, AsyncPipe, DatePipe],
    templateUrl: './appointment-slots-view.component.html',
    styleUrl: './appointment-slots-view.component.scss'
})
export class AppointmentSlotsViewComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input()
  serviceId?: string;
  appointmentSlots: AppointmentSlot[] = [];
  isLoadingSlots = true;
  selectedDate$ = new BehaviorSubject<Date>(getTodayAsDate());
  _dateSubscription?: Subscription;

  constructor(
    private appointmentSlotService: AppointmentSlotService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._dateSubscription = this.selectedDate$
      .pipe(debounceTime(600))
      .subscribe((date) => this._loadAppointmentSlots(date));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceId'] && this.serviceId) {
      this._loadAppointmentSlots(this.selectedDate$.value);
    }
  }

  ngOnDestroy(): void {
    this._dateSubscription?.unsubscribe();
  }

  onSelectDateClicked(): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      data: this.selectedDate$.value,
    });

    dialogRef.afterClosed().subscribe((selectedDate?: Date) => {
      if (!selectedDate || selectedDate == this.selectedDate$.value) return;
      this.selectedDate$.next(selectedDate);
    });
  }

  onNewAppointmentSlotClicked(): void {
    const dialogRef = this.dialog.open(NewAppointmentSlotDialogComponent, {
      data: this.selectedDate$.value,
      panelClass: 'full-screen-dialog',
    });

    // dialogRef.afterClosed().subscribe((selectedDate?: Date) => {
    // if (!selectedDate || selectedDate == this.selectedDate$.value) return;
    // this.selectedDate$.next(selectedDate);
    // });
  }

  nextDate(): void {
    this.selectedDate$.next(addDaysToDate(this.selectedDate$.value, 1));
  }

  previousDate(): void {
    this.selectedDate$.next(addDaysToDate(this.selectedDate$.value, -1));
  }

  _loadAppointmentSlots(date: Date): void {
    if (!this.serviceId) return;

    this.isLoadingSlots = true;

    this.appointmentSlotService
      .getAppointmentSlotsInDateRange(
        this.serviceId,
        date,
        addDaysToDate(date, 1),
      )
      .pipe(finalize(() => (this.isLoadingSlots = false)))
      .subscribe({
        next: (slots) => (this.appointmentSlots = slots),
        error: (error) => console.error('Failed to load slots', error),
      });
  }
}
