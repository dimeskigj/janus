import { Routes } from '@angular/router';
import { PlaceholderComponent } from './components/common/placeholder/placeholder.component';

export const routes: Routes = [
    { path: 'upcoming', component: PlaceholderComponent },
    { path: 'services', component: PlaceholderComponent },
    { path: 'settings', component: PlaceholderComponent },
    { path: '**', redirectTo: 'upcoming' },
];
