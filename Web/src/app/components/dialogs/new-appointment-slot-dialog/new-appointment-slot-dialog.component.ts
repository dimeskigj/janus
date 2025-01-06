import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-new-appointment-slot-dialog',
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    templateUrl: './new-appointment-slot-dialog.component.html',
    styleUrl: './new-appointment-slot-dialog.component.scss'
})
export class NewAppointmentSlotDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public currentDate: Date,
    public dialogRef: MatDialogRef<NewAppointmentSlotDialogComponent>,
  ) {}
}
