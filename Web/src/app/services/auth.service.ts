import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithRedirect } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null>;
  token$ = new BehaviorSubject<String | null>(null);

  constructor(private auth: Auth) {
    this.user$ = new BehaviorSubject(auth.currentUser);

    this._updateIdToken();

    auth.onIdTokenChanged((_) => this._updateIdToken());
    auth.onAuthStateChanged((user) => {
      this.user$.next(user);
      this._updateIdToken();
    });
  }

  private _updateIdToken(): void {
    this.user$.getValue()?.getIdToken().then(this.token$.next);
  }

  googleSignInWithRedirect(): Promise<void> {
    return signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
