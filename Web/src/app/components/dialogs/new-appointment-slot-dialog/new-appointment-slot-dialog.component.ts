import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RepeatType } from '../../../domain/appointment-slot';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  addDaysToDate,
  addMinutesToDate,
  getTodayAsDate,
} from '../../../utils/date-time-utils';
import { MatOptionModule } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { delay, finalize, of, switchMap, tap } from 'rxjs';
import { AppointmentSlotService } from '../../../services/appointment-slot.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-new-appointment-slot-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    AsyncPipe,
    MatProgressBarModule,
  ],
  templateUrl: './new-appointment-slot-dialog.component.html',
  styleUrl: './new-appointment-slot-dialog.component.scss',
})
export class NewAppointmentSlotDialogComponent {
  minimumDate = getTodayAsDate();
  maximumDate = addDaysToDate(getTodayAsDate(), 365);
  isRepeating = false;
  isLoading = false;
  serviceId = '';

  form = new FormGroup({
    dateAndTime: new FormControl(new Date(), [Validators.required]),
    durationInMinutes: new FormControl(15, [
      Validators.min(5),
      Validators.required,
    ]),
    repeatType: new FormControl(RepeatType.Daily),
    repeatUntil: new FormControl(addDaysToDate(this.minimumDate, 1), [
      Validators.required,
    ]),
  });

  isFormValid$ = this.form.valueChanges.pipe(
    switchMap(() => of(this._isFormStateValid())),
  );

  addDaysToDate = addDaysToDate;
  repeatType = RepeatType;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { date: Date; serviceId: string },
    public dialogRef: MatDialogRef<NewAppointmentSlotDialogComponent>,
    private appointmentSlotService: AppointmentSlotService,
  ) {
    data.date.setHours(12, 0, 0);
    this.form.controls.dateAndTime.setValue(data.date);
    this.serviceId = data.serviceId;
  }

  onSaveSlot(): void {
    if (!this._isFormStateValid()) return;

    console.log(
      this.form.controls.dateAndTime.value!,
      this.form.controls.durationInMinutes.value!,
      addMinutesToDate(
        this.form.controls.dateAndTime.value!,
        this.form.controls.durationInMinutes.value!,
      ),
    );

    const dto = {
      serviceId: this.serviceId,
      startTime: this.form.controls.dateAndTime.value!,
      endTime: addMinutesToDate(
        this.form.controls.dateAndTime.value!,
        this.form.controls.durationInMinutes.value!,
      ),
      maximumAppointments: 1,
      isRepeating: this.isRepeating,
      repeatType: RepeatType.None,
      repeatFromDate: new Date(),
      repeatToDate: new Date(),
    };

    if (this.isRepeating) {
      dto.repeatType = this.form.controls.repeatType.value!;
      dto.repeatFromDate = addDaysToDate(dto.startTime, 1);
      dto.repeatToDate = addDaysToDate(
        this.form.controls.repeatUntil.value!,
        1,
      );
    }

    this.appointmentSlotService
      .createAppointmentSlot(dto)
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: (slot) => {
          this.dialogRef.close(slot);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  _isFormStateValid(): boolean {
    const isDateTimeValid = this.form.controls.dateAndTime.valid;
    const isDurationValid = this.form.controls.durationInMinutes.valid;
    const isRepeatUntilValid = this.form.controls.repeatUntil.valid;

    return (
      isDateTimeValid &&
      isDurationValid &&
      (!this.isRepeating || isRepeatUntilValid)
    );
  }
}
