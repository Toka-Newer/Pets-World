import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from './../../environment/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  base_url = `${API_URL}/blog`
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OTA4NGYwMTk1NTkyNDQ0NThhMDljZiIsImlhdCI6MTY4NzE5MjgyOH0.6wIXTzPXpGpJUqy4zs5vOZFf4Q58JtYJXXpd7BECgSc';
  token: string = this.authService.token;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getTokenData();
  }

  getDogs(params: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url, { headers, params });
  }
}
