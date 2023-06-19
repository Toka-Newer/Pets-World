import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  retypePassword: string;
  phone: string;
  gender: string;
  role: string;
  pets?: PetData[]; // Make the 'pets' property optional
  user_id?: string; // Make the 'user_id' property optional
  cost?: number; // Make the 'cost' property optional
  experience?: number; // Make the 'experience' property optional
  description?: string; // Make the 'description' property optional
}
interface PetData {
  name: string;
  type: string;
  gender: string;
  dateOfBirth?: Date;
  age: number;
  description?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  genderOptions: string[] = ['male', 'female'];
  roleOptions: string[] = ['owner', 'vet'];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        retypePassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      pets: this._formBuilder.array([]), // Initialize empty array for pets
      cost: [''],
      experience: [''],
      description: [''],
    });
  }
  // Custom validator function
  passwordMatchValidator(
    group: FormGroup
  ): { passwordMismatch: boolean } | null {
    const password = group.get('password')?.value;
    const retypePassword = group.get('retypePassword')?.value;

    return password === retypePassword ? null : { passwordMismatch: true };
  }

  get petFormArray() {
    return this.secondFormGroup.get('pets') as FormArray;
  }

  addPet() {
    const petGroup = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', Validators.required],
      description: [''],
    });

    this.petFormArray.push(petGroup);
  }

  removePet(index: number) {
    this.petFormArray.removeAt(index);
  }

  submitForm() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const userdata: UserData = {
        firstName: this.firstFormGroup.value.firstName,
        lastName: this.firstFormGroup.value.lastName,
        email: this.firstFormGroup.value.email,
        password: this.firstFormGroup.value.password,
        retypePassword: this.firstFormGroup.value.retypePassword,
        gender: this.secondFormGroup.value.gender,
        role: this.secondFormGroup.value.role,
        phone: this.secondFormGroup.value.phone,
      };
      console.log(userdata);
      if (this.secondFormGroup.value.role === 'owner') {
        // Add pets data
        userdata.pets = this.petFormArray.value;
        console.log(userdata.pets);
      } else if (this.secondFormGroup.value.role === 'vet') {
        userdata.cost = this.secondFormGroup.value.cost;
        userdata.experience = this.secondFormGroup.value.experience;
        userdata.description = this.secondFormGroup.value.description;
      }

      this.userService.register(userdata).subscribe({
        next: (res) => {
          console.log(res);
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }
}
