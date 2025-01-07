import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnectGmailComponent } from './pages/account/connect-gmail/connect-gmail.component';
import { AuthorizeGuard } from './core/guards/authorize.guard';
import { ContentLayout, HeaderLayout } from './layouts';

export const routes: Routes = [
  {
    path: '',
    component: HeaderLayout,
    canActivate: [AuthorizeGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'calendar', loadChildren: () => import('./pages/calendar/calendar.routes').then(m => m.routes) },
    ]
  },
  {
    path: 'connect-gmail',
    component: ConnectGmailComponent,
    canActivate: [AuthorizeGuard],
  },
  {
    path: 'auth',
    component: ContentLayout,
    children: [
      { path: '', component: AuthComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];
