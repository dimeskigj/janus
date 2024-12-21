import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TenantListComponent } from "../../components/tenant-list/tenant-list.component";

@Component({
  selector: 't-settings',
  standalone: true,
  imports: [MatIconModule, AsyncPipe, TenantListComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  tenants$?: Observable<Tenant[]>;
  selectedTenantId: string = '';

  constructor(private tenantService: TenantService) { }

  ngOnInit(): void {
    this.tenants$ = this.tenantService.getTenantsForUser();
  }
}
