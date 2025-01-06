import { Component } from '@angular/core';
import { PageTitleComponent } from '../../components/common/page-title/page-title.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Observable, switchMap } from 'rxjs';
import { Service } from '../../domain/service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppointmentSlotsViewComponent } from '../../components/appointment-slots-view/appointment-slots-view.component';

@Component({
    selector: 'app-service-details',
    imports: [
        PageTitleComponent,
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterLink,
        AppointmentSlotsViewComponent,
    ],
    templateUrl: './service-details.component.html',
    styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent {
  service$?: Observable<Service>;

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.service$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.serviceService.getServiceById(id);
      }),
    );
  }
}
