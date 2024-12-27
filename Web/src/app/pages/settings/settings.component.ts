import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TenantListComponent } from "../../components/tenant-list/tenant-list.component";
import { PageTitleComponent } from "../../components/common/page-title/page-title.component";
import { LocalStorageService, keys } from '../../services/local-storage.service';
import { SelectedTenantComponent } from "../../components/selected-tenant/selected-tenant.component";

@Component({
  selector: 't-settings',
  standalone: true,
  imports: [AsyncPipe, TenantListComponent, PageTitleComponent, SelectedTenantComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  tenants$?: Observable<Tenant[]>;
  selectedTenant$?: Observable<Tenant>;

  constructor(private tenantService: TenantService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const currentTenantId = this.localStorageService.getItem<string>(keys.SELECTED_TENANT_ID);
    this.selectedTenant$ = this.tenantService.getTenantById(currentTenantId ?? '');
    this.tenants$ = this.tenantService.getTenantsForUser();
  }
}
