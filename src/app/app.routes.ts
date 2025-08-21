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
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page/homepage.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/home/admin/admin-page/admin.component').then(
            (m) => m.AdminComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/home/admin/profile/profile/profile.component'
              ).then((m) => m.AdminProfileComponent),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './features/home/admin/profile/profile-view/profile-view.component'
                  ).then((m) => m.CompanyProfileViewComponent),
              },
              {
                path: 'edit-company-profile',
                loadComponent: () =>
                  import(
                    './features/home/admin/profile/edit-profile/edit-profile.component'
                  ).then((m) => m.EditProfileComponent),
              },
            ],
          },
          {
            path: 'add-job',
            loadComponent: () =>
              import('./features/home/admin/add-job/add-job.component').then(
                (m) => m.AddJobComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [loggedInGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canActivate: [loggedInGuard],
      },
      {
        path: 'company-register',
        loadComponent: () =>
          import(
            './features/auth/company-registration/company-registration.component'
          ).then((m) => m.CompanyRegistrationComponent),
        canActivate: [loggedInGuard],
      },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/components/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];

// {
//   path: 'admin',
//   component: AdminComponent, // <-- keep AdminComponent as parent container
//   canActivate: [authGuard],
//   data: { roles: ['Admin'] },
//   children: [
//     {
//       path: '',
//       redirectTo: 'dashboard', // default child
//       pathMatch: 'full',
//     },
//     {
//       path: 'dashboard',
//       loadComponent: () =>
//         import('./features/home/admin/dashboard/dashboard.component').then(
//           (m) => m.DashboardComponent
//         ),
//     },
//     {
//       path: 'users',
//       loadComponent: () =>
//         import('./features/home/admin/users/users.component').then(
//           (m) => m.UsersComponent
//         ),
//     },
//     {
//       path: 'settings',
//       loadComponent: () =>
//         import('./features/home/admin/settings/settings.component').then(
//           (m) => m.SettingsComponent
//         ),
//     },
//   ],
// }

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
