import {
  Component,
  booleanAttribute,
  input,
  output
} from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { constants } from '../../../constants';

@Component({
  selector: 't-navbar',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly user = input<User | null>(null);
  readonly isLoadingAuthState = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly signOut = output<Event>();
  readonly signIn = output<Event>();
  readonly allowSignIn = input(true);

  currentLocale = constants.locale.appLanguage;
  currentLocaleIcon = this.currentLocale == 'en' ? 'flag-gb' : 'flag-mk';

  setLocale(locale: string): void {
    localStorage.setItem(constants.locale.localStorageKey, locale);
    window.location.reload();
  }
}
