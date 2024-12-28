import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageTitleComponent } from "../common/page-title/page-title.component";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';

@Component({
  selector: 't-create-tenant-form',
  standalone: true,
  imports: [PageTitleComponent, MatInputModule, MatButtonModule, RouterModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './create-tenant-form.component.html',
  styleUrl: './create-tenant-form.component.scss'
})
export class CreateTenantFormComponent implements OnChanges {
  @Input() isForced = false;
  @Input() isEditing = false;
  @Output() savedChanges = new EventEmitter<Tenant>();
  @Input() tenant?: Tenant;

  isLoadingChanges = false;
  tenantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private tenantService: TenantService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tenant);
    if (changes['tenant'] && this.tenant) {
      this.tenantForm.controls.name.setValue(this.tenant?.name ?? '');
      this.tenantForm.controls.description.setValue(this.tenant?.description ?? '');
    }
  }

  onCreateTenant(): void {
    this.isLoadingChanges = true;
    this.tenantService.createTenant({
      name: this.tenantForm.value.name!,
      description: this.tenantForm.value.description ?? ''
    }).subscribe({
      next: (tenant) => {
        this.savedChanges.next(tenant);
      },
      error: (error) => {
        console.error(error);
        this.isLoadingChanges = false;
      }
    });
  }

  onSaveEdit(): void {
    this.isLoadingChanges = true;

    this.tenantService.updateTenant(
      {
        ...this.tenant!,
        name: this.tenantForm.controls.name.value!,
        description: this.tenantForm.controls.description.value ?? ''
      }
    ).subscribe({
      next: (tenant) => {
        this.savedChanges.next(tenant);
      },
      error: (error) => {
        console.error(error);
        this.isLoadingChanges = false;
      }
    });
  }
}
