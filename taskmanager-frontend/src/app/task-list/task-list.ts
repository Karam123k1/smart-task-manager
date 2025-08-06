import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../features/tasks/task.service';
import { Task } from '../features/tasks/task.model';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule],
  template: `
    <h3>Aufgabenliste</h3>
    <ul>
      <li *ngFor="let task of tasks">
        <strong>{{ task.title }}</strong> - {{ task.status }}
        <button (click)="deleteTask(task.id)">🗑️ Löschen</button>
      </li>
    </ul>
  `,
})
export class TaskList implements OnChanges {
  @Input() refresh = 0;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnChanges() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().subscribe((data) => (this.tasks = data));
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe(() => this.loadTasks());
  }
}
