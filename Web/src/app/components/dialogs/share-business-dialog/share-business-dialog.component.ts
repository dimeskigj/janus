import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { Tenant } from '../../../domain/tenant';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 't-share-business-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, QRCodeModule],
  templateUrl: './share-business-dialog.component.html',
  styleUrl: './share-business-dialog.component.scss'
})
export class ShareBusinessDialogComponent {
  isCopied = false;
  qrCodeDownloadLink?: string;

  constructor(
    public dialogRef: MatDialogRef<ShareBusinessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tenant: Tenant,
    private clipboard: Clipboard
  ) { }


  get publicUrl(): string {
    return `${environment.webUrl}/t/${this.tenant?.slug}`;
  }

  copyPublicUrl(): void {
    this.clipboard.copy(this.publicUrl);
    this.isCopied = true;

    setTimeout(() => this.isCopied = false, 2000);
  }

  onChangeQrUrl(url: SafeUrl) {
    this.qrCodeDownloadLink = url as string;
  }
}
