import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/core/services/environment/environment';
import { EditVetService } from 'src/app/core/services/vet/editVet/edit-vet.service';

@Component({
  selector: 'app-edit-vet',
  templateUrl: './edit-vet.component.html',
  styleUrls: ['./edit-vet.component.css'],
})
export class EditVetComponent {
  vet: any = {}; // Object to store vet data
  constructor(private vetService: EditVetService) {}
  vetId = '648dd6c55a2fb5c9b45df45b'; // Replace with the actual vet ID

  ngOnInit(): void {
    this.getVetData(this.vetId);
  }

  getVetData(id: string) {
    this.vetService.getVetById(id).subscribe(
      (data: any) => {
        this.vet = data;
        this.vet.user_id.image = `${API_URL}/${this.vet.user_id.image}`;
        console.log(this.vet);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onUserImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileName = file.name;
      this.vet.user_id.image = fileName;

      // Read the image file and display it preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vet.user_id.image = e.target.result;
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    } else {
      this.vet.user_id.image = ''; // Clear the image preview
    }
  }

  onSubmit() {
    const vetId = '648dd6c55a2fb5c9b45df45b'; // Replace with the actual vet ID
    const vetData = this.vet;
    vetData.id = vetId;

    this.vetService.updateVetById(vetData).subscribe(
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
