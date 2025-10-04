import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'all-leads',
    loadComponent: () =>
      import('./all-leads/all-leads.component').then(
        (m) => m.AllLeadsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'all-calls',
    loadComponent: () =>
      import('./all-calls/all-calls.component').then(
        (m) => m.AllCallsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'live-calls',
    loadComponent: () =>
      import('./live-calls/live-calls.component').then(
        (m) => m.LiveCallsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'hourly-report',
    loadComponent: () =>
      import('./hourly-report/hourly-report.component').then(
        (m) => m.HourlyReportComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'monthly-report',
    loadComponent: () =>
      import('./monthly-report/monthly-report.component').then(
        (m) => m.MonthlyReportComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'executives-report',
    loadComponent: () =>
      import('./executives-report/executives-report.component').then(
        (m) => m.ExecutivesReportComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
