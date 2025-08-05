import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../features/tasks/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Neue Aufgabe</h3>
    <form (ngSubmit)="createTask()">
      <input [(ngModel)]="title" name="title" placeholder="Titel" required />
      <input
        [(ngModel)]="description"
        name="description"
        placeholder="Beschreibung"
      />
      <select [(ngModel)]="status" name="status">
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Bearbeitung</option>
        <option value="DONE">Erledigt</option>
      </select>
      <br /><br />
      <button type="submit">Speichern</button>
    </form>
  `,
})
export class TaskForm {
  @Output() taskCreated = new EventEmitter<void>();
  title = '';
  description = '';
  status: any = 'TODO';

  constructor(private taskService: TaskService) {}

  createTask() {
    this.taskService
      .create({
        id: 0,
        title: this.title,
        description: this.description,
        status: this.status,
        projectId: 1, // Beispiel
      })
      .subscribe(() => {
        this.taskCreated.emit();
        this.title = '';
        this.description = '';
        this.status = 'TODO';
      });
  }
}
