import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BottomNavButtonComponent } from "./components/common/bottom-nav-button/bottom-nav-button.component";

const example = $localize`:@@example:This is a component i18n example`;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MatProgressBarModule, NavbarComponent, MatToolbarModule, MatIconModule, MatButtonModule, BottomNavButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user$?: BehaviorSubject<User | null>;
  token$?: BehaviorSubject<String | null>;
  isLoadingAuthState$?: BehaviorSubject<boolean>;

  constructor(private authService: AuthService, private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.user$ = authService.user$;
    this.token$ = authService.token$;
    this.isLoadingAuthState$ = authService.isLoadingState$;

    this.iconRegistry.addSvgIcon(
      "flag-mk",
      this.domSanitizer.bypassSecurityTrustResourceUrl("icons/flag-mk.svg")
    );
    this.iconRegistry.addSvgIcon(
      "flag-gb",
      this.domSanitizer.bypassSecurityTrustResourceUrl("icons/flag-gb.svg")
    );
  }

  async signInWithGoogle() {
    await this.authService.googleSignInWithRedirect();
  }

  async signOut() {
    await this.authService.logout();
  }
}
