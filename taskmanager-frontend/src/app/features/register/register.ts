import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/AuthService';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Registrieren</h2>
    <form (ngSubmit)="register()">
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
      <button type="submit">Registrieren</button>
      <div *ngIf="error" style="color:red">{{ error }}</div>
    </form>
  `,
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth
      .register({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => (this.error = 'Registrierung fehlgeschlagen'),
      });
  }
}
