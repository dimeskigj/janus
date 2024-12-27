import { Routes } from '@angular/router';
import { PlaceholderComponent } from './components/common/placeholder/placeholder.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NewTenantComponent } from './pages/new-tenant/new-tenant.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';

export const routes: Routes = [
  { path: 'admin/upcoming', component: PlaceholderComponent },
  { path: 'admin/services', component: PlaceholderComponent },
  { path: 'admin/settings', component: SettingsComponent },
  { path: 'admin/settings/tenant/new', component: NewTenantComponent },
  { path: 'admin/getting-started', component: GettingStartedComponent },
  { path: '**', redirectTo: 'admin/upcoming' },
];
