import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  register(user: any) {
    return this.http.post(`${API_URL}/register`, user);
  }
}
