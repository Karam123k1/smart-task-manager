// src/app/features/users/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../core/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Benutzerliste</h2>
    <ul>
      <li *ngFor="let user of users">{{ user.username }} ({{ user.email }})</li>
    </ul>
  `,
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => (this.users = data));
  }
}
