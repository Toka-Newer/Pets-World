import { Component } from '@angular/core';
import { EditVetService } from 'src/app/core/services/vet/editVet/edit-vet.service';

@Component({
  selector: 'app-edit-vet',
  templateUrl: './edit-vet.component.html',
  styleUrls: ['./edit-vet.component.css'],
})
export class EditVetComponent {
  vet: any = {}; // Object to store vet data
  user: any = {}; // Object to store user data
  constructor(private vetService: EditVetService) {}

  onSubmit() {
    const vetId = '648dd6c55a2fb5c9b45df45b'; // Replace with the actual vet ID
    const vetData = this.vet;
    const userData = this.user;

    this.vetService.updateVetById(vetId, vetData, userData).subscribe(
      (res) => {
        // Handle response from the backend
        console.log(res);
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
