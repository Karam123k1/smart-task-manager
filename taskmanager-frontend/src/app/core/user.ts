// src/app/core/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
