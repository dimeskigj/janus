import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';
import { BehaviorSubject, filter, map } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LocalStorageService, keys } from './services/local-storage.service';
import { TenantService } from './services/tenant.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';

@Component({
  selector: 'app-root',
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
    BottomNavBarComponent,
    SideNavComponent,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  user$?: BehaviorSubject<User | null>;
  token$?: BehaviorSubject<String | null>;
  isLoadingAuthState$?: BehaviorSubject<boolean>;
  isAdminView$ = new BehaviorSubject<boolean>(false);
  hasTenants = true;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private tenantService: TenantService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.iconRegistry.addSvgIcon(
      'flag-mk',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/flag-mk.svg'),
    );
    this.iconRegistry.addSvgIcon(
      'flag-gb',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/flag-gb.svg'),
    );
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.token$ = this.authService.token$;
    this.isLoadingAuthState$ = this.authService.isLoadingState$;

    this.user$?.subscribe((user) => {
      this._handleUserChanges(user);
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => (event as NavigationEnd).url.includes('admin/')),
      )
      .subscribe(this.isAdminView$);
  }

  async signInWithGoogle() {
    await this.authService.googleSignInWithPopup();
  }

  async signOut() {
    await this.authService.logout();
  }

  _handleUserChanges(user: User | null) {
    if (!user || !this.isAdminView$.value) return;

    this.tenantService.getTenantsForUser().subscribe((tenants) => {
      if (!tenants?.length) {
        this.hasTenants = false;
        this.router.navigateByUrl('admin/getting-started');
        return;
      }

      const currentTenantId = this.localStorageService.getItem<string>(
        keys.SELECTED_TENANT_ID,
      );
      const hasAccessToCurrentTenant = tenants.find(
        (t) => t.id === currentTenantId,
      );

      if (!currentTenantId || !hasAccessToCurrentTenant) {
        this.localStorageService.setItem(
          keys.SELECTED_TENANT_ID,
          tenants[0].id,
        );
        location.reload();
        return;
      }
    });
  }
}
