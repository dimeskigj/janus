import { Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 't-settings-item',
  imports: [MatRippleModule, MatIconModule, RouterModule],
  templateUrl: './settings-item.component.html',
  styleUrl: './settings-item.component.scss',
})
export class SettingsItemComponent {
  readonly icon = input('');
  readonly text = input('');
  readonly routerLink = input('');
}
