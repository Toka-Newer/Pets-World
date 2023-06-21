import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url: string = 'http://localhost:8080/register';
  constructor(private http: HttpClient) { }
  register(user: any) {
    return this.http.post(this.base_url, user);
  }
}
