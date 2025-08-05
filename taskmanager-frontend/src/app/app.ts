import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/AuthService';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterModule],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a> |
      <a routerLink="/login" *ngIf="!(auth.isLoggedIn$ | async)">Login</a> |
      <a routerLink="/register" *ngIf="!(auth.isLoggedIn$ | async)"
        >Registrieren</a
      >
      |
      <button (click)="auth.logout()" *ngIf="auth.isLoggedIn$ | async">
        Logout
      </button>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
