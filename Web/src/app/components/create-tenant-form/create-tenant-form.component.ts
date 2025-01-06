import {
  Component,
  OnChanges,
  SimpleChanges,
  input,
  output
} from '@angular/core';
import { PageTitleComponent } from '../common/page-title/page-title.component';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../domain/tenant';

@Component({
  selector: 't-create-tenant-form',
  imports: [
    PageTitleComponent,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-tenant-form.component.html',
  styleUrl: './create-tenant-form.component.scss',
})
export class CreateTenantFormComponent implements OnChanges {
  readonly isForced = input(false);
  readonly isEditing = input(false);
  readonly tenant = input<Tenant>();
  readonly savedChanges = output<Tenant>();

  isLoadingChanges = false;
  tenantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private tenantService: TenantService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const tenant = this.tenant();
    console.log(tenant);
    if (changes['tenant'] && tenant) {
      this.tenantForm.controls.name.setValue(tenant?.name ?? '');
      this.tenantForm.controls.description.setValue(tenant?.description ?? '');
    }
  }

  onCreateTenant(): void {
    this.isLoadingChanges = true;
    this.tenantService
      .createTenant({
        name: this.tenantForm.value.name!,
        description: this.tenantForm.value.description ?? '',
      })
      .subscribe({
        next: (tenant) => {
          this.savedChanges.emit(tenant);
        },
        error: (error) => {
          console.error(error);
          this.isLoadingChanges = false;
        },
      });
  }

  onSaveEdit(): void {
    this.isLoadingChanges = true;

    this.tenantService
      .updateTenant({
        ...this.tenant()!,
        name: this.tenantForm.controls.name.value!,
        description: this.tenantForm.controls.description.value ?? '',
      })
      .subscribe({
        next: (tenant) => {
          this.savedChanges.emit(tenant);
        },
        error: (error) => {
          console.error(error);
          this.isLoadingChanges = false;
        },
      });
  }
}
