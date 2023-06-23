import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './environment/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${API_URL}/login`;
    const loginData = { email, password };

    return this.http.post(loginUrl, loginData);
  }
}
