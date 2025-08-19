import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';
import { authGuard } from './core/guard/auth/auth-guard';
import { loggedInGuard } from './core/guard/logged-in/logged-in-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', loadComponent : () => import('./features/home/home-page/homepage.component').then(m => m.HomePageComponent)},
      {path: 'admin', loadComponent : () => import('./features/home/admin/admin.component').then(m => m.AdminComponent), canActivate: [authGuard], data: {roles:['Admin']}},

    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', loadComponent : () => import('./features/auth/login/login.component').then(m => m.LoginComponent), canActivate: [loggedInGuard]},
      {path: 'register', loadComponent : () => import('./features/auth/register/register.component').then(m => m.RegisterComponent), canActivate: [loggedInGuard]}
    ]
  },
  { path: "unauthorized", loadComponent: () => import("./shared/components/unauthorized/unauthorized.component").then(m => m.UnauthorizedComponent) },
  { path: "**", redirectTo: "login" }


];

// {
//   path: 'admin',
//   loadComponent: () => import('./admin/admin-dashboard.component'),
//   canActivate: [authGuard],
//   data: { roles: ['Admin'] },
// },
// {
//   path: 'candidate',
//   loadComponent: () => import('./candidate/candidate-dashboard.component'),
//   canActivate: [authGuard],
//   data: { roles: ['Candidate'] },
// },
// {
//   path: 'interviewer',
//   loadComponent: () => import('./interviewer/interviewer-dashboard.component'),
//   canActivate: [authGuard],
//   data: { roles: ['Interviewer'] },
// },