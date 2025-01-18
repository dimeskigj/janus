import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../components/common/page-title/page-title.component';
import { TenantListComponent } from '../../components/tenant-list/tenant-list.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Tenant } from '../../domain/tenant';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 't-your-tenants',
  imports: [PageTitleComponent, TenantListComponent, AsyncPipe],
  templateUrl: './your-tenants.component.html',
  styleUrl: './your-tenants.component.scss',
})
export class YourTenantsComponent implements OnInit {
  tenants$?: Observable<Tenant[]>;

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenants$ = this.tenantService.getTenantsForUser();
  }
}
