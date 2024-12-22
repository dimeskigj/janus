import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 't-page-title',
  standalone: true,
  imports: [MatIconModule, MatProgressBarModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() isLoading = false;
}
