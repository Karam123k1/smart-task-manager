import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';
import { AuthService } from '../shared/AuthService';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, TaskList, TaskForm],
  template: `
    <h2>Task Manager Dashboard</h2>
    <app-task-form (taskCreated)="onTaskCreated()"></app-task-form>
    <app-task-list [refresh]="refreshTrigger"></app-task-list>
  `,
})
export class DashboardComponent {
  refreshTrigger = 0;

  onTaskCreated() {
    this.refreshTrigger++;
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
