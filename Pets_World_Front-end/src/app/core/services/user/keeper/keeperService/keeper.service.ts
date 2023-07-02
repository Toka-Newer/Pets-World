import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../environment/environment';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class KeeperService {
  base_url: string = `${API_URL}/keepers`;
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OGUxYmE2YWRiZjQzNDkxYjE3MmUzOCIsImlhdCI6MTY4NzA0MDAwOH0.h0Upf4d0wX3PRsiiF4DFzVaNYNEFg0M8GCD84mOjFi4';
  token: string = this.authService.token;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getTokenData();
  }

  getKeeperById(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }
  geAlltKeepers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get(this.base_url + `/keepers`, { headers });
  }
  updateKeeperRating(id: string, data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.patch(this.base_url + `/${id}`, JSON.stringify(data), { headers });
  }
}
