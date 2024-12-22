import { Component } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import { CreateTenantFormComponent } from "../../components/create-tenant-form/create-tenant-form.component";
import { LocalStorageService, keys } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 't-getting-started',
  standalone: true,
  imports: [CreateTenantFormComponent, AsyncPipe],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss'
})
export class GettingStartedComponent {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private localStorageService: LocalStorageService,
    authService: AuthService,
    private router: Router
  ) {
    this.user$ = authService.user$;
  }

  onTenantCreated(tenant: Tenant): void {
    this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenant.id);
    this.router.navigateByUrl('upcoming').then((_) => location.reload());
  }
}
