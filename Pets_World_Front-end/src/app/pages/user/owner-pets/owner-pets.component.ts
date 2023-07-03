import { Component,OnInit } from '@angular/core';
import { Pet } from 'src/app/pages/user/owner-pets/models/Ipets';
import { PetService } from 'src/app/core/services/user/userPets/user-pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-pets',
  templateUrl: './owner-pets.component.html',
  styleUrls: ['./owner-pets.component.css']
})

export class OwnerPetsComponent {
  ownerId: string='';
pets: Pet[] = [];

constructor(

  private route: ActivatedRoute,
  private petService: PetService
) {}

  //CREATE FUNCTION TO GET DATA FROM SERVICE
  ngOnInit(): void {
    const ownerId=this.route.snapshot.paramMap.get('ownerId');
    if(ownerId){
      this.petService.getAllPetsByOwnerId(ownerId).subscribe((pets) => {
        this.pets = pets;
      });
    }



}

createPet(): void {
  this.petService.createPet(this.ownerId, this.pets).subscribe(createdPet => {
    // Handle successful creation
    console.log('New pet created:', createdPet);
  });

}
}





