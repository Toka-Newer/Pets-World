import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './environment/environment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  role!: string;
  user_id!: string;
  token!: string;
  keeper_id: any;
  owner_id: any;
  vet_id: any;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${API_URL}/login`;
    const loginData = { email, password };
    return this.http.post(loginUrl, loginData);
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token') as string;
    if (this.token) this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }

  getTokenData() {
    this.token = localStorage.getItem('token') as string;
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      this.role = decoded?.role;
      this.user_id = decoded?.id;
      this.owner_id = decoded?.owner_id;
      this.keeper_id = decoded?.keeper_id;
      this.vet_id = decoded?.vet_id;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.role = '';
    this.user_id = '';
  }
}
