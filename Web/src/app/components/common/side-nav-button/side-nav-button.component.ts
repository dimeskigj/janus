import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 't-side-nav-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './side-nav-button.component.html',
  styleUrl: './side-nav-button.component.scss'
})
export class SideNavButtonComponent {
  @Input()
  link = '';
  @Input()
  icon = '';
  @Input()
  text = '';
  @Input()
  disabled = false;
}
