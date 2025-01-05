export interface AppointmentSlot {
  id: string;
  maximumAppointments: number;
  confirmedAppointmentCount: number;
  startTime: Date;
  endTime: Date;
  isRepeating: boolean;
  repeatType: RepeatType;
  repeatFromDate: Date;
  repeatToDate: Date;
  parentAppointmentSlotId?: string;
  serviceId: string;
}

export interface CreateAppointmentSlotDto {
  serviceId: string;
  startTime: Date;
  endTime: Date;
  maximumAppointments: number;
  isRepeating: boolean;
  repeatType: RepeatType;
  repeatFromDate: Date;
  repeatToDate: Date;
  parentAppointmentSlotId?: string;
}

export enum RepeatType {
  None = 0,
  Daily = 1,
  Weekday = 2,
  Weekly = 3,
  Monthly = 4
}
