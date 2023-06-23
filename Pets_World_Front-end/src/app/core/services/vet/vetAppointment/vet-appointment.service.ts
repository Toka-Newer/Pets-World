import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VetAppointmentService {
  base_url: string = `${API_URL}/vet/lastAppointments`;
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OGUxYmE2YWRiZjQzNDkxYjE3MmUzOCIsImlhdCI6MTY4NzA0MDAwOH0.h0Upf4d0wX3PRsiiF4DFzVaNYNEFg0M8GCD84mOjFi4';

  constructor(private http: HttpClient) { }
  getVetAppointment(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.base_url + `/${id}`, { headers });
  }
}