import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { constants } from '../../../constants';

@Component({
  selector: 't-navbar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
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

  currentLocale = constants.locale.appLanguage;
  currentLocaleIcon = this.currentLocale == 'en' ? 'flag-gb' : 'flag-mk';

  setLocale(locale: string): void {
    localStorage.setItem(constants.locale.localStorageKey, locale);
    window.location.reload();
  }
}
