import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VetBookingService {
  base_url: string = `${API_URL}/vet/booking`;
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OTA4NGYwMTk1NTkyNDQ0NThhMDljZiIsImlhdCI6MTY4NzE5MjgyOH0.6wIXTzPXpGpJUqy4zs5vOZFf4Q58JtYJXXpd7BECgSc';

  constructor(private http: HttpClient) { }

  getBookingByVetId(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }

  getVetSchedule(filter: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    const params = new HttpParams({ fromObject: filter });
    return this.http.get(this.base_url, { headers, params });
  }

  addVetBooking(data: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.post(this.base_url, JSON.stringify(data), { headers });
  }

  deleteVetBooking(id: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(this.base_url + `/${id}`, { headers });
  }
}
