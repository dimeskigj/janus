import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from "../../components/common/page-title/page-title.component";
import { ServiceService } from '../../services/service.service';
import { LocalStorageService, keys } from '../../services/local-storage.service';
import { Observable } from 'rxjs';
import { Service } from '../../domain/service';
import { ServicesListComponent } from "../../components/services-list/services-list.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 't-services',
  standalone: true,
  imports: [PageTitleComponent, ServicesListComponent, AsyncPipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  services$?: Observable<Service[]>;

  constructor(
    private serviceService: ServiceService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const tenantId = this.localStorageService.getItem<string>(keys.SELECTED_TENANT_ID);

    if (!tenantId) throw Error("Tenant ID not defined.")

    this.services$ = this.serviceService.getServicesForTenant(tenantId);
  }
}
