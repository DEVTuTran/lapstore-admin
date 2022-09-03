import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { routes } from 'src/app/consts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public routers: typeof routes = routes;

  private isAuthenticated = false;
  private token?: string | null;
  private userId!: string | null;
  public authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  public saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId,
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
  }

  public logOut(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate([this.routers.LOGIN]);
  }

  public login(data: AuthData) {
    const authData: AuthData = data;
    return this.http.post<any>(environment.api_url + 'auth/login', authData);
  }

  public tokenExpired(id: string | null) {
    return this.http.get<any>(
      environment.api_url + 'auth/checktokenexpired/' + id
    );
  }
}
