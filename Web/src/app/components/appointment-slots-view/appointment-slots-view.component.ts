import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  addDaysToDate,
  getTodayAsDate,
  removeHours,
} from '../../utils/date-time-utils';
import { AppointmentSlot } from '../../domain/appointment-slot';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../dialogs/calendar-dialog/calendar-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { constants } from '../../../constants';
import { DailyAppointmentSlotsViewComponent } from '../daily-appointment-slots-view/daily-appointment-slots-view.component';
import { AppointmentSlotService } from '../../services/appointment-slot.service';

@Component({
  selector: 't-appointment-slots-view',
  imports: [
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    DatePipe,
    LayoutModule,
    DailyAppointmentSlotsViewComponent,
  ],
  templateUrl: './appointment-slots-view.component.html',
  styleUrl: './appointment-slots-view.component.scss',
})
export class AppointmentSlotsViewComponent implements OnInit, OnDestroy {
  readonly serviceId = input<string>();
  readonly destroyed = new Subject<void>();

  selectedDateSubject$ = new BehaviorSubject<Date>(getTodayAsDate());
  appointmentSlots$?: Observable<AppointmentSlot[]>;
  reloadSlots$ = new Subject();

  selectedDate$ = this.selectedDateSubject$.pipe(
    debounceTime(300),
    switchMap((date) => of(removeHours(date))),
    distinctUntilChanged(
      (prev, curr) => new Date(prev).getTime() === new Date(curr).getTime(),
    ),
  );

  isLargeBreakpoint$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  addDaysToDate = addDaysToDate;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private appointmentSlotService: AppointmentSlotService,
  ) {}

  ngOnInit(): void {
    this.selectedDateSubject$
      .pipe(
        tap((day) => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { day: day.toISOString() },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });
        }),
        takeUntil(this.destroyed),
      )
      .subscribe();

    this.appointmentSlots$ = merge(
      this.selectedDate$,
      this.isLargeBreakpoint$,
      this.reloadSlots$,
    ).pipe(
      switchMap((_) =>
        this.appointmentSlotService.getAppointmentSlotsInDateRange(
          this.serviceId()!,
          this.selectedDateSubject$.value,
          addDaysToDate(
            this.selectedDateSubject$.value,
            this.isLargeBreakpoint$.value ? 4 : 1,
          ),
        ),
      ),
      tap((d) => console.log(d)),
      takeUntil(this.destroyed),
    );

    this.route.queryParamMap
      .pipe(
        switchMap((params) => of(params.get('day') as string)),
        filter((day: string) => !!day),
        switchMap((day: string) => of(new Date(day))),
        takeUntil(this.destroyed),
      )
      .subscribe(this.selectedDateSubject$);

    this.breakpointObserver
      .observe(constants.breakpoints.lg)
      .pipe(
        switchMap((state) => of(state.matches)),
        takeUntil(this.destroyed),
      )
      .subscribe(this.isLargeBreakpoint$);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSelectDateClicked(): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      data: this.selectedDateSubject$.value,
    });

    dialogRef.afterClosed().subscribe((selectedDate?: Date) => {
      if (!selectedDate || selectedDate == this.selectedDateSubject$.value)
        return;
      this.selectedDateSubject$.next(selectedDate);
    });
  }

  nextDate(incrementBy: number): void {
    this.selectedDateSubject$.next(
      addDaysToDate(this.selectedDateSubject$.value, incrementBy),
    );
  }

  onReloadSlots(): void {
    this.reloadSlots$.next(undefined);
  }
}
