import { Routes } from '@angular/router';
import { PlaceholderComponent } from './components/common/placeholder/placeholder.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NewTenantComponent } from './pages/new-tenant/new-tenant.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';

export const routes: Routes = [
  { path: 'upcoming', component: PlaceholderComponent },
  { path: 'services', component: PlaceholderComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/tenant/new', component: NewTenantComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: '**', redirectTo: 'upcoming' },
];
