import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import { LocalStorageService, keys } from '../../services/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 't-tenant-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent implements OnChanges {
  @Input() tenants?: Tenant[];
  selectedTenant?: Tenant;
  isExpanded = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tenants']) {
      const selectedTenantId = this.localStorageService.getItem<string>(keys.SELECTED_TENANT_ID);
      this.selectedTenant = this.tenants?.find(t => t.id === selectedTenantId);

      this.tenants = this.tenants?.sort((t1, t2) => {
        if (t1.id === selectedTenantId) return -1;
        if (t2.id === selectedTenantId) return 1;
        return t2.createdAt > t1.createdAt ? -1 : 1;
      });
    }
  }

  swapTenantTo(tenant: Tenant): void {
    this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenant.id);
    location.reload();
  }
}
