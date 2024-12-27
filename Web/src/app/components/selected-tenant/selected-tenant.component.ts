import { Component, Input } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 't-selected-tenant',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './selected-tenant.component.html',
  styleUrl: './selected-tenant.component.scss'
})
export class SelectedTenantComponent {
  @Input()
  tenant?: Tenant;
  isCopied = false;

  constructor(private clipboard: Clipboard) { }

  get publicUrl(): string {
    return `https://app.termince.com/t/${this.tenant?.slug}`;
  }

  copyPublicUrl(): void {
    this.clipboard.copy(this.publicUrl);
    this.isCopied = true;

    setTimeout(() => this.isCopied = false, 2000);
  }
}
