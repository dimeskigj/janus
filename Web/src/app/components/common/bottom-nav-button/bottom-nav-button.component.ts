import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 't-bottom-nav-button',
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav-button.component.html',
  styleUrl: './bottom-nav-button.component.scss',
})
export class BottomNavButtonComponent {
  readonly link = input('');
  readonly icon = input('');
  readonly text = input('');
}
