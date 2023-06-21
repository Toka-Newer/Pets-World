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
  pets?: PetData[];
  user_id?: string;
  cost?: number;
  experience?: number;
  description?: string;
  userImage?: File;
  vetLicense?: File;
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
  hide = true;
  rehide = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  genderOptions: string[] = ['male', 'female'];
  roleOptions: string[] = ['owner', 'vet'];
  petTypeOptions: string[] = ['dog', 'cat', 'bird', 'turtle'];
  errorMessages: string[] = [];

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
        phone: ['', Validators.required],
      }
      // { validator: this.passwordMatchValidator }
    );

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      role: ['', Validators.required],
      pets: this._formBuilder.array([]),
      cost: [''],
      experience: [''],
      description: [''],
      // userImage: [null], // Control for user image
      // vetLicense: [null], // Control for vet license
    });
    this.addPet();
  }

  // passwordMatchValidator(
  //   group: FormGroup
  // ): { passwordMismatch: boolean } | null {
  //   const password = group.get('password')?.value;
  //   const retypePassword = group.get('retypePassword')?.value;
  //   return password === retypePassword ? null : { passwordMismatch: true };
  // }

  onUserImageChange(event: any) {
    const file = event.target.files[0];
    this.secondFormGroup.patchValue({ userImage: file });
  }

  onVetLicenseChange(event: any) {
    const file = event.target.files[0];
    this.secondFormGroup.patchValue({ vetLicense: file });
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

  // ... Other code

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
        phone: this.firstFormGroup.value.phone,
      };

      if (this.secondFormGroup.value.role === 'owner') {
        userdata.pets = this.petFormArray.value;
        console.log(userdata.pets);

        if (userdata.pets?.length === 0) {
          console.log('Please add at least one pet.');
          return;
        }
      } else if (this.secondFormGroup.value.role === 'vet') {
        userdata.cost = this.secondFormGroup.value.cost;
        userdata.experience = this.secondFormGroup.value.experience;
        userdata.description = this.secondFormGroup.value.description;

        if (!userdata.cost || !userdata.experience || !userdata.description) {
          console.log('Please fill in all vet information.');
          return;
        }
      } else {
        console.log('Invalid role selected.');
        return;
      }

      this.userService.register(userdata).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 400 && err.error && err.error.errors) {
            // If the backend returns validation errors, update the form controls with the error messages
            const errorMessages = err.error.errors;

            Object.keys(errorMessages).forEach((field) => {
              const formControl =
                this.firstFormGroup.get(field) ||
                this.secondFormGroup.get(field);
              if (formControl) {
                formControl.setErrors({ serverError: errorMessages[field] });
              }
            });
          }
        },
      });
    } else {
      console.log('Please fill in all required fields.');
    }
  }
}
