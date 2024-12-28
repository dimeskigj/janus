import { Component, Input, inject } from '@angular/core';
import { Tenant } from '../../domain/tenant';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ShareBusinessDialogComponent } from '../dialogs/share-business-dialog/share-business-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 't-selected-tenant',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './selected-tenant.component.html',
  styleUrl: './selected-tenant.component.scss'
})
export class SelectedTenantComponent {
  @Input()
  tenant?: Tenant;
  dialog = inject(MatDialog);

  openShareDialog(): void {
    this.dialog.open(ShareBusinessDialogComponent, { data: this.tenant });
  }
}
