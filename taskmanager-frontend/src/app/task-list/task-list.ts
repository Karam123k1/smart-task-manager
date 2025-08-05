import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../features/tasks/task.service';
import { Task } from '../features/tasks/task.model';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule],
  template: `
    <h3>Aufgaben</h3>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} - {{ task.status }}
        <button (click)="delete(task.id)">🗑️</button>
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

  delete(id: number) {
    this.taskService.delete(id).subscribe(() => this.loadTasks());
  }
}
