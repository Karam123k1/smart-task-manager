import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/AuthService';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <label>
        Benutzername:
        <input type="text" [(ngModel)]="username" name="username" required />
      </label>
      <br />
      <label>
        Passwort:
        <input
          type="password"
          [(ngModel)]="password"
          name="password"
          required
        />
      </label>
      <br /><br />
      <button type="submit">Anmelden</button>
      <div *ngIf="error" style="color:red">{{ error }}</div>
    </form>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => (this.error = 'Login fehlgeschlagen'),
      });
  }
}
