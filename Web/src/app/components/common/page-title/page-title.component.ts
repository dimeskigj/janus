import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 't-page-title',
  imports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  readonly title = input<string>();
  readonly icon = input<string>();
  readonly isLoading = input(false);
  readonly hasBackButton = input(false);
  readonly backLink = input<string>();
}
