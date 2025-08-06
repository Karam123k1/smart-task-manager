import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private loggedIn = new BehaviorSubject<boolean>(!!this.getToken());
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post('/api/auth/login', data).pipe(
      tap((res: any) => {
        if (isPlatformBrowser(this.platformId))
          localStorage.setItem(this.tokenKey, res.token);
        this.loggedIn.next(true);
      })
    );
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post('/api/auth/register', data);
  }

  logout() {
    if (isPlatformBrowser(this.platformId))
      localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId))
      return localStorage.getItem(this.tokenKey);

    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }
}
