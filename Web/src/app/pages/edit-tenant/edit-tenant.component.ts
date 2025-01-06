import { Component, OnInit } from '@angular/core';
import { CreateTenantFormComponent } from '../../components/create-tenant-form/create-tenant-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-tenant',
  standalone: true,
  imports: [CreateTenantFormComponent, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './edit-tenant.component.html',
  styleUrl: './edit-tenant.component.scss',
})
export class EditTenantComponent implements OnInit {
  editingTenant$?: Observable<Tenant>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.editingTenant$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.tenantService.getTenantById(id);
      })
    );
  }

  onSavedChanges() {
    this.router.navigateByUrl('admin/settings');
  }
}
