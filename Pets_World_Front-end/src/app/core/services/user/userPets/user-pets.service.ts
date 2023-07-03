import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerPetsComponent } from 'src/app/pages/user/owner-pets/owner-pets.component';
import { AuthService } from '../../auth.service';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080';
  // token!: string;
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoib3duZXIiLCJpZCI6IjY0OTU1MDg0ZDY1NTQ4Y2E2YmQ2NmViMyIsImlhdCI6MTY4NzUwNzM1MX0.EaRXqDtddZG0MPNgnHvacI8jaBMl2NQsWN3KFzL73Uc';


  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getAllPetsByOwnerId(ownerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/owners/pets/${ownerId}`);
  }

  createPet(ownerId: string, pet: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owners/${ownerId}/pets`, pet);
  }

  deletePet(petId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pets/${petId}`);
  }

  updatePet(petId: string, pet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pets/${petId}`, pet);
  }
}
