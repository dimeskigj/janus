import { Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import {
  LocalStorageService,
  keys,
} from '../../services/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 't-tenant-list',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, RouterModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss',
})
export class TenantListComponent implements OnChanges {
  readonly tenants = input<Tenant[]>();
  selectedTenant?: Tenant;
  isExpanded = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tenants']) {
      const selectedTenantId = this.localStorageService.getItem<string>(
        keys.SELECTED_TENANT_ID,
      );
      const tenants = this.tenants();
      this.selectedTenant = tenants?.find((t) => t.id === selectedTenantId);

      this.tenants.apply(
        tenants?.sort((t1, t2) => {
          if (t1.id === selectedTenantId) return -1;
          if (t2.id === selectedTenantId) return 1;
          return t2.createdAt > t1.createdAt ? -1 : 1;
        }),
      );
    }
  }

  swapTenantTo(tenant: Tenant): void {
    this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenant.id);
    location.reload();
  }
}
