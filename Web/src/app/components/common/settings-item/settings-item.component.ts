import { Component, Input } from '@angular/core';
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
  @Input()
  icon = '';
  @Input()
  text = '';
  @Input()
  routerLink = '';
}
