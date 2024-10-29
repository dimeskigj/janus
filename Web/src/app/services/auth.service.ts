import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, getRedirectResult, signInWithRedirect } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  token$ = new BehaviorSubject<String | null>(null);

  constructor(private auth: Auth) {
    getRedirectResult(auth).then((credentials) => {
      this.user$.next(credentials?.user ?? null);
      this._updateIdToken(credentials?.user ?? null);
    });

    auth.onAuthStateChanged((user) => {
      this.user$.next(user);
      this._updateIdToken(user);
    });

    auth.onIdTokenChanged((user) => this._updateIdToken(user));
  }

  private _updateIdToken(user: User | null): void {
    if (user) {
      user.getIdToken().then((token) => this.token$.next(token));
    } else {
      this.token$.next(null);
    }
  }

  async googleSignInWithRedirect(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
