import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 't-calendar',
  imports: [MatDialogModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './calendar-dialog.component.html',
  styleUrl: './calendar-dialog.component.scss',
})
export class CalendarDialogComponent {
  selected: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentDate: Date,
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
  ) {
    this.selected = currentDate;
  }

  onOk(): void {
    this.dialogRef.close(this.selected);
  }
}
