import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.base_url}/login`;
    const loginData = { email, password };

    return this.http.post(loginUrl, loginData);
  }
}
