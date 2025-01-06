import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavButtonComponent } from "../common/side-nav-button/side-nav-button.component";
import { MatIconModule } from '@angular/material/icon';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 't-side-nav',
    imports: [SideNavButtonComponent, MatIconModule, MatButtonModule],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input()
  disabled = false;
  @Input()
  user: User | null = null;
  @Output()
  signOut = new EventEmitter<undefined>();
}
