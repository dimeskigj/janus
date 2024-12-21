import { Component, OnInit } from '@angular/core';
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
import { MatSidenavModule } from "@angular/material/sidenav";
import { SideNavButtonComponent } from "./components/common/side-nav-button/side-nav-button.component";
import { LocalStorageService, keys } from './services/local-storage.service';
import { TenantService } from './services/tenant.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    AsyncPipe,
    MatProgressBarModule,
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BottomNavButtonComponent,
    SideNavButtonComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user$?: BehaviorSubject<User | null>;
  token$?: BehaviorSubject<String | null>;
  isLoadingAuthState$?: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private tenantService: TenantService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      "flag-mk",
      this.domSanitizer.bypassSecurityTrustResourceUrl("icons/flag-mk.svg")
    );
    this.iconRegistry.addSvgIcon(
      "flag-gb",
      this.domSanitizer.bypassSecurityTrustResourceUrl("icons/flag-gb.svg")
    );
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.token$ = this.authService.token$;
    this.isLoadingAuthState$ = this.authService.isLoadingState$;

    this.user$?.subscribe((user) => {
      this._handleUserChanges(user);
    });
  }

  async signInWithGoogle() {
    await this.authService.googleSignInWithRedirect();
  }

  async signOut() {
    await this.authService.logout();
  }

  _handleUserChanges(user: User | null) {
    if (!user) return;

    this.tenantService
      .getTenantsForUser()
      .subscribe((tenants) => {
        if (!tenants) {
          // TODO: HANDLE NO TENANTS
          return;
        }

        const currentTenantId = this.localStorageService.getItem<string>(keys.SELECTED_TENANT_ID);
        const hasAccessToCurrentTenant = tenants.find(t => t.id === currentTenantId);

        if (!currentTenantId || !hasAccessToCurrentTenant) {
          this.localStorageService.setItem(keys.SELECTED_TENANT_ID, tenants[0].id);
          location.reload()
          return;
        }
      })
  }
}
