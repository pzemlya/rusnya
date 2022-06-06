import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoles } from '../models/user-roles.enum';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl + '/auth';
  private token$ = new BehaviorSubject<string | null>(this.getTokenFromLs());

  constructor(private http: HttpClient) {}

  public get isLoggedIn() {
    return !!this.token;
  }

  public get token() {
    const tokenExpires = this.getTokenExpiresFromLs();
    const isExpiredToken = tokenExpires && Date.now() > tokenExpires;
    if (isExpiredToken) {
      this.logout();
      return null;
    }

    return this.token$.value;
  }

  public get userData() {
    if (!this.token) {
      return null;
    }

    const middle = this.token.split('.')[1];
    return JSON.parse(atob(middle)) as {
      user_id: string;
      email: string;
      role: UserRoles;
    };
  }

  public login(data: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/login', data).pipe(
      tap((token) => {
        this.token$.next(token);
        this.setTokenToLs(token);
      })
    );
  }

  public register(data: {
    email: string;
    password: string;
  }): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/register', data).pipe(
      tap((token) => {
        this.token$.next(token);
        this.setTokenToLs(token);
      })
    );
  }

  public logout() {
    this.token$.next(null);
    this.clearTokenFromLs();
  }

  public isAdmin() {
    return this.isLoggedIn && this.userData?.role === UserRoles.admin;
  }

  private getTokenFromLs(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  private getTokenExpiresFromLs(): number | null {
    const tokenExpires = localStorage.getItem('tokenExpires');
    if (tokenExpires) {
      return JSON.parse(tokenExpires);
    }
    return null;
  }

  private setTokenToLs(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem(
      'tokenExpires',
      JSON.stringify(Date.now() + 365 * 24 * 60 * 60 * 1000)
    );
  }

  private clearTokenFromLs(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpires');
  }
}
