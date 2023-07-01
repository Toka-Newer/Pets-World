import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../../../environment/environment';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeeperBookingService {
  base_url: string = `${API_URL}/keeper/booking`;
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OGUxYmE2YWRiZjQzNDkxYjE3MmUzOCIsImlhdCI6MTY4NzA0MDAwOH0.h0Upf4d0wX3PRsiiF4DFzVaNYNEFg0M8GCD84mOjFi4'
  token: string = this.authService.token;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getTokenData();
  }

  getBookingByKeeperId(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }

  addKeeperBooking(data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.post(this.base_url, JSON.stringify(data), { headers });
  }

  getKeeperSchedule(filter: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const params = new HttpParams({ fromObject: filter });
    return this.http.get(this.base_url, { headers, params });
  }
}
