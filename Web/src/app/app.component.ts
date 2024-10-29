import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Auth, User, getRedirectResult } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, MatButtonModule, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user$?: BehaviorSubject<User | null>;
  token$?: BehaviorSubject<String | null>;
  isLoadingAuthState?: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
    this.token$ = authService.token$;
    this.isLoadingAuthState = authService.isLoadingState$;
  }

  async signInWithGoogle() {
    await this.authService.googleSignInWithRedirect();
  }

  async signOut() {
    await this.authService.logout();
  }
}
