import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import { CreateTenantFormComponent } from "../../components/create-tenant-form/create-tenant-form.component";
import { LocalStorageService, keys } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '@angular/fire/auth';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 't-getting-started',
  standalone: true,
  imports: [CreateTenantFormComponent, AsyncPipe],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss'
})
export class GettingStartedComponent implements OnInit {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private tenantService: TenantService,
    authService: AuthService,
    private router: Router
  ) {
    this.user$ = authService.user$;
  }

  ngOnInit(): void {
    this.tenantService.getTenantsForUser().subscribe({
      next: (tenants) => {
        if (tenants?.length) this.router.navigateByUrl('upcoming');
      }
    })
  }

  onTenantCreated(tenant: Tenant): void {
    this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenant.id);
    this.router.navigateByUrl('upcoming').then((_) => location.reload());
  }
}
