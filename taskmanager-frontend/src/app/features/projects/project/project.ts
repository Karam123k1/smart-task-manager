import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { ProjectService, Project } from '../../../core/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: `
    <h2>Projekte</h2>
    <ul *ngIf="projects$ | async as projects">
      <li *ngFor="let project of projects">
        <strong>{{ project.name }}</strong
        >: {{ project.description }}
      </li>
    </ul>
  `,
})
export class ProjectListComponent implements OnInit {
  projects$!: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
