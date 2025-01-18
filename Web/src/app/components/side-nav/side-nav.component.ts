import { Component, input, output } from '@angular/core';
import { SideNavButtonComponent } from '../common/side-nav-button/side-nav-button.component';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 't-side-nav',
  imports: [SideNavButtonComponent, MatIconModule, MatButtonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  readonly disabled = input(false);
  readonly user = input<User | null>(null);
  readonly signOut = output();
}
