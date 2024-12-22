import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageTitleComponent } from "../common/page-title/page-title.component";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';

@Component({
  selector: 't-create-tenant-form',
  standalone: true,
  imports: [PageTitleComponent, MatInputModule, MatButtonModule, RouterModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './create-tenant-form.component.html',
  styleUrl: './create-tenant-form.component.scss'
})
export class CreateTenantFormComponent {
  @Input() isForced = false;
  @Output() tenantCreated = new EventEmitter<Tenant>();

  isCreatingTenant = false;
  tenantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private tenantService: TenantService, private localStorageService: LocalStorageService, private router: Router) { }

  onCreateTenant() {
    this.isCreatingTenant = true;
    this.tenantService.createTenant({
      name: this.tenantForm.value.name!,
      description: this.tenantForm.value.description ?? ''
    }).subscribe({
      next: (tenant) => {
        this.tenantCreated.next(tenant);
      },
      error: (error) => {
        console.error(error);
        this.isCreatingTenant = false;
      }
    });
  }
}
