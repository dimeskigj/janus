import { Component, computed, input, output } from '@angular/core';
import {
  addDaysToDate,
  getMinuteDifference,
} from '../../utils/date-time-utils';
import { SortPipe } from '../../pipes/sort.pipe';
import { MatIconModule } from '@angular/material/icon';
import { NewAppointmentSlotDialogComponent } from '../dialogs/new-appointment-slot-dialog/new-appointment-slot-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSlot } from '../../domain/appointment-slot';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 't-daily-appointment-slots-view',
  imports: [
    SortPipe,
    MatIconModule,
    DatePipe,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './daily-appointment-slots-view.component.html',
  styleUrl: './daily-appointment-slots-view.component.scss',
})
export class DailyAppointmentSlotsViewComponent {
  readonly changed = output();
  readonly date = input<Date>();
  readonly serviceId = input<string>();
  readonly showDate = input<boolean>(false);
  readonly appointmentSlots = input<AppointmentSlot[] | undefined>(undefined);
  readonly filteredAppointmentSlots = computed(() =>
    this.appointmentSlots()?.filter(
      (slot) =>
        addDaysToDate(this.date()!, 1).getTime() >=
          new Date(slot.startTime).getTime() &&
        this.date()!.getTime() <= new Date(slot.startTime).getTime(),
    ),
  );

  getMinuteDifference = getMinuteDifference;
  math = Math;

  constructor(private dialog: MatDialog) {}

  onNewAppointmentSlotClicked(date: Date): void {
    const dialogRef = this.dialog.open(NewAppointmentSlotDialogComponent, {
      data: {
        date: date,
        serviceId: this.serviceId(),
      },
      panelClass: 'full-screen-dialog',
    });

    dialogRef.afterClosed().subscribe((result?: AppointmentSlot) => {
      if (!result) return;
      this.changed.emit();
    });
  }

  isPast(endTime: string | Date): boolean {
    const end = new Date(endTime);
    return end < new Date();
  }
}
