import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { EditOwnerService } from 'src/app/core/services/user/editOwner/edit-owner.service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css'],
})
export class EditOwnerComponent implements OnInit {
  owner: any = {}; // Object to store owner data
  // ownerId = '648f9646bd39fe8c0527ee4f'; // Replace with the actual owner ID
  ownerId!: any; // Replace with the actual owner ID
  ownerImage: any;
  keeper: any = {};

  constructor(private ownerService: EditOwnerService, private authService: AuthService) {
    this.ownerId = authService.getOwnerId();
  }

  ngOnInit(): void {
    this.getOwnerData(this.ownerId);
  }

  getOwnerData(id: string) {
    this.ownerService.getOwnerById(id).subscribe(
      (data: any) => {
        console.log(data);
        this.owner = data.owner;
        if (data.keeper) {
          this.keeper = data.keeper;
        }
        this.ownerImage = `${API_URL}/${this.owner.user_id.image}`;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onUserImageClick(event: MouseEvent): void {
    event.preventDefault();
    const hiddenInput = document.querySelector('input[type="file"]');
    hiddenInput?.dispatchEvent(new MouseEvent('click'));
  }

  onUserImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileName = file.name;
      this.ownerImage = fileName;

      // Read the image file and display it preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.ownerImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.owner.user_id.image = file;
    } else {
      this.ownerImage = ''; // Clear the image preview
    }
  }

  onSubmit() {
    const ownerId = '648f9646bd39fe8c0527ee4f'; // Replace with the actual owner ID
    const formData = new FormData();
    formData.append('id', ownerId);
    formData.append('isKeeper', this.owner.isKeeper);
    formData.append('firstName', this.owner.user_id.firstName);
    formData.append('lastName', this.owner.user_id.lastName);
    formData.append('phone', this.owner.user_id.phone);
    formData.append('gender', this.owner.user_id.gender);
    formData.append('experience', this.keeper.experience);
    formData.append('cost', this.keeper.cost);
    formData.append('description', this.keeper.description);
    formData.append('image', this.owner.user_id.image);
    // const ownerData: { [key: string]: any } = {
    //   id: ownerId,
    //   isKeeper: this.owner.isKeeper,
    //   firstName: this.owner.user_id.firstName,
    //   lastName: this.owner.user_id.lastName,
    //   phone: this.owner.user_id.phone,
    //   gender: this.owner.user_id.gender,
    //   description: this.keeper.description,
    //   cost: this.keeper.cost,
    //   experience: this.keeper.experience,
    // }

    // const formData = new FormData();

    // for (const key in ownerData) {
    //   if (ownerData.hasOwnProperty(key)) {
    //     formData.append(key, ownerData[key]);
    //   }
    // }
    // formData.append('image', this.owner.user_id.image);

    this.ownerService.updateOwnerById(formData).subscribe(
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
