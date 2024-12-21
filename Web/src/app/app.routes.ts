import { Routes } from '@angular/router';
import { PlaceholderComponent } from './components/common/placeholder/placeholder.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    { path: 'upcoming', component: PlaceholderComponent },
    { path: 'services', component: PlaceholderComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'upcoming' },
];
