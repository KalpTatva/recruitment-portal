import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', loadComponent : () => import('./features/home/home-page/homepage.component').then(m => m.HomePageComponent)}
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', loadComponent : () => import('./features/auth/login/login.component').then(m => m.LoginComponent)},
      {path: 'register', loadComponent : () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)}
    ]
  }
];
