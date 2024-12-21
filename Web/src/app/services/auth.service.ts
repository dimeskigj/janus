import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithRedirect } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);
  token$ = new BehaviorSubject<String | null>(null);
  isLoadingState$ = new BehaviorSubject<boolean>(true);

  constructor(private auth: Auth) {
    auth.onAuthStateChanged((user) => {
      this._updateIdToken(user);
    });

    auth.onIdTokenChanged((user) => this._updateIdToken(user));
  }

  private _updateIdToken(user: User | null): void {
    if (user) {
      user.getIdToken().then((token) => {
        this.token$.next(token);
        this.user$.next(user);
        this.isLoadingState$.next(false);
      });
    } else {
      this.token$.next(null);
      this.user$.next(null);
    }
  }

  async googleSignInWithRedirect(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
