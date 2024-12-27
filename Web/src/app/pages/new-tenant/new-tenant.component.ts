import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CreateTenantFormComponent } from "../../components/create-tenant-form/create-tenant-form.component";
import { Tenant } from "../../domain/tenant";
import { LocalStorageService, keys } from "../../services/local-storage.service";

@Component({
  selector: 't-new-tenant',
  standalone: true,
  imports: [CreateTenantFormComponent],
  templateUrl: './new-tenant.component.html',
  styleUrl: './new-tenant.component.scss'
})
export class NewTenantComponent {
  isCreatingTenant = false;
  tenantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  onTenantCreated(tenant: Tenant): void {
    this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenant.id);
    this.router.navigateByUrl('admin/settings');
  }
}
