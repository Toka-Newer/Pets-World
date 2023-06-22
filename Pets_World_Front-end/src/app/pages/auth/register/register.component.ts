import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  thirdFormGroup!: FormGroup<{}>;
  file_store: File[] = [];
  file_list: Array<string> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), this.noNumberValidator],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), this.noNumberValidator],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0-2]{1}[0-9]{8}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      retypePassword: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      role: ['', Validators.required],
      pets: this._formBuilder.array([]),
      cost: ['', Validators.required],
      experience: ['', Validators.required],
      description: [''],
      userImage: [null], // Control for user image
      vetLicense: [null], // Control for vet license
    });

    this.addPet();
    this.thirdFormGroup = this._formBuilder.group({});
  }

  get petFormArray() {
    return this.secondFormGroup.get('pets') as FormArray;
  }

  submitForm() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const userdata: UserData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        userImage: this.file_store[0], // Use the userImage file
      };

      if (this.secondFormGroup.value.role === 'owner') {
        userdata.pets = this.petFormArray.value;
        console.log(userdata.pets);

        if (!userdata.pets || userdata.pets.length === 0) {
          console.log('Please add at least one pet.');
          return;
        }
      } else if (this.secondFormGroup.value.role === 'vet') {
        userdata.cost = this.secondFormGroup.value.cost;
        userdata.experience = this.secondFormGroup.value.experience;
        userdata.vetLicense = this.secondFormGroup.value.vetLicense; // Include vetLicense for vet role

        if (!userdata.cost || !userdata.experience) {
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

  // submitForm() {
  //   if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
  //     const userdata: UserData = {
  //       // firstName: this.firstFormGroup.value.firstName,
  //       // lastName: this.firstFormGroup.value.lastName,
  //       // email: this.firstFormGroup.value.email,
  //       // password: this.firstFormGroup.value.password,
  //       // retypePassword: this.firstFormGroup.value.retypePassword,
  //       // gender: this.secondFormGroup.value.gender,
  //       // role: this.secondFormGroup.value.role,
  //       // phone: this.firstFormGroup.value.phone,
  //       ...this.firstFormGroup.value,
  //       ...this.secondFormGroup.value,
  //       userImage: this.file_store[0], // Use the userImage file
  //       vetLicense: this.secondFormGroup.controls['vetLicense'].value,
  //     };

  //     if (this.secondFormGroup.value.role === 'owner') {
  //       userdata.pets = this.petFormArray.value;
  //       console.log(userdata.pets);

  //       if (userdata.pets?.length === 0) {
  //         console.log('Please add at least one pet.');
  //         return;
  //       }
  //     } else if (this.secondFormGroup.value.role === 'vet') {
  //       userdata.cost = this.secondFormGroup.value.cost;
  //       userdata.experience = this.secondFormGroup.value.experience;
  //       userdata.description = this.secondFormGroup.value.description;

  //       if (!userdata.cost || !userdata.experience || !userdata.description) {
  //         console.log('Please fill in all vet information.');
  //         return;
  //       }
  //     } else {
  //       console.log('Invalid role selected.');
  //       return;
  //     }

  //     this.userService.register(userdata).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         if (err.status === 400 && err.error && err.error.errors) {
  //           // If the backend returns validation errors, update the form controls with the error messages
  //           const errorMessages = err.error.errors;

  //           Object.keys(errorMessages).forEach((field) => {
  //             const formControl =
  //               this.firstFormGroup.get(field) ||
  //               this.secondFormGroup.get(field);
  //             if (formControl) {
  //               formControl.setErrors({ serverError: errorMessages[field] });
  //             }
  //           });
  //         }
  //       },
  //     });
  //   } else {
  //     console.log('Please fill in all required fields.');
  //   }
  // }
  // --------add and remove pets --------
  addPet() {
    const petGroup = this._formBuilder.group({
      name: ['', [Validators.required, this.noNumberValidator]],
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

  // ---------validations-----------

  onUserImageChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      const fileName = files[0].name;
      this.secondFormGroup.controls['userImage'].patchValue(
        `${fileName}${count}`
      );
      this.file_store = Array.from(files);
    } else {
      this.secondFormGroup.controls['userImage'].patchValue('');
      this.file_store = [];
    }
  }

  onVetLicenseChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      const fileName = files[0].name;
      this.secondFormGroup.controls['vetLicense'].patchValue(
        `${fileName}${count}`
      );
      // Handle the vetLicense file as needed
    } else {
      this.secondFormGroup.controls['vetLicense'].patchValue('');
      // Handle the case when no vetLicense file is selected
    }
  }
  checkPasswords() {
    const passwordControl = this.firstFormGroup.get('password');
    const retypePasswordControl = this.firstFormGroup.get('retypePassword');

    if (passwordControl && retypePasswordControl) {
      const password = passwordControl.value;
      const retypePassword = retypePasswordControl.value;

      // Update the validity of the 'retypePassword' form control based on the match status
      if (password === retypePassword) {
        retypePasswordControl.setErrors(null);
      } else {
        retypePasswordControl.setErrors({ mismatch: true });
      }
    }
  }
  passwordsMatch() {
    const retypePasswordControl = this.firstFormGroup.get('retypePassword');
    return retypePasswordControl && !retypePasswordControl.hasError('mismatch');
  }
  // Custom validator function to check for numbers in the input
  noNumberValidator = (control: FormControl) => {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    return hasNumber ? { containsNumber: true } : null;
  };
}
