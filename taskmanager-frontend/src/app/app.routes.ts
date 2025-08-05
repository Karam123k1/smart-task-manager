import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { authGuard } from './shared/AuthGuard';
import { RegisterComponent } from './features/register/register';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadComponent: () =>
      import('./features/projects/project/project').then(
        (m) => m.ProjectListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'user-list',
    loadComponent: () =>
      import('./features/users/user-list/user-list').then(
        (m) => m.UserListComponent
      ),
  },
];
