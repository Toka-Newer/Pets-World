import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerPetsComponent } from 'src/app/pages/user/owner-pets/owner-pets.component';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllPetsByOwnerId(ownerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/owners/${ownerId}/pets`);
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
