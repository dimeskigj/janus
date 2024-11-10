import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 't-navbar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input()
  user: User | null = null;
  @Input({ transform: booleanAttribute })
  isLoadingAuthState: boolean = false;
  @Output()
  signOut = new EventEmitter<Event>();
  @Output()
  signIn = new EventEmitter<Event>();
}
