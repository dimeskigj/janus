import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 't-page-title',
    imports: [MatIconModule, MatProgressBarModule, MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './page-title.component.html',
    styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() isLoading = false;
  @Input() hasBackButton = false;
  @Input() backLink?: string;
}
