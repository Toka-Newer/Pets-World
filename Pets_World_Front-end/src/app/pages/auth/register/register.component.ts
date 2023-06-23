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
  images: { image?: File; license?: File }[];
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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup<{}>;
  genderOptions: string[] = ['male', 'female'];
  roleOptions: string[] = ['owner', 'vet'];
  petTypeOptions: string[] = ['dog', 'cat', 'bird', 'turtle'];
  errorMessages: string[] = [];
  file_store: File[] = [];
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
      userImage: ['', Validators.required], // Control for user image
      vetLicense: ['', Validators.required], // Control for vet license
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
        firstName: this.firstFormGroup.get('firstName')?.value,
        lastName: this.firstFormGroup.get('lastName')?.value,
        phone: this.firstFormGroup.get('phone')?.value,
        email: this.firstFormGroup.get('email')?.value,
        password: this.firstFormGroup.get('password')?.value,
        retypePassword: this.firstFormGroup.get('retypePassword')?.value,
        gender: this.secondFormGroup.get('gender')?.value,
        role: this.secondFormGroup.get('role')?.value,
        images: [],
      };
      if (this.file_store[0]) {
        userdata.images.push({ image: this.file_store[0] });
      }

      if (this.secondFormGroup.value.role === 'owner') {
        userdata.pets = this.petFormArray.value;
        if (!userdata.pets || userdata.pets.length === 0) {
          console.log('Please add at least one pet.');
          return;
        }
      } else if (this.secondFormGroup.value.role === 'vet') {
        const costControl = this.secondFormGroup.get('cost');
        const experienceControl = this.secondFormGroup.get('experience');
        if (this.file_store[1]) {
          userdata.images.push({ license: this.file_store[1] });
        }
        if (!costControl && !experienceControl) {
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
      this.file_store[0] = files[0];
      if (files.length > 1) {
        const fileName2 = files[1].name;
        this.secondFormGroup.controls['vetLicense'].patchValue(
          `${fileName2}${count}`
        );
        this.file_store[1] = files[1];
      }
      console.log(this.file_store);
    } else {
      this.secondFormGroup.controls['userImage'].patchValue('');
      this.secondFormGroup.controls['vetLicense'].patchValue('');
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
      this.file_store[1] = files[0];
      if (files.length > 1) {
        const fileName2 = files[1].name;
        this.secondFormGroup.controls['userImage'].patchValue(
          `${fileName2}${count}`
        );
        this.file_store[0] = files[1];
      }
      console.log(this.file_store);
    } else {
      this.secondFormGroup.controls['userImage'].patchValue('');
      this.secondFormGroup.controls['vetLicense'].patchValue('');
      this.file_store = [];
    }
  }

  // onUserImageChange(event: any): void {
  //   const files: FileList = event.target.files;
  //   if (files && files.length > 0) {
  //     const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
  //     const fileName = files[0].name;
  //     this.secondFormGroup.controls['userImage'].patchValue(
  //       `${fileName}${count}`
  //     );
  //     this.file_store = Array.from(files);
  //     console.log(this.file_store);
  //   } else {
  //     this.secondFormGroup.controls['userImage'].patchValue('');
  //     this.file_store = [];
  //   }
  // }

  // onVetLicenseChange(event: any): void {
  //   const files: FileList = event.target.files;
  //   if (files && files.length > 0) {
  //     const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
  //     const fileName = files[0].name;
  //     this.secondFormGroup.controls['vetLicense'].patchValue(
  //       `${fileName}${count}`
  //     );
  //     // Handle the vetLicense file as needed
  //     this.file_store = Array.from(files);
  //     console.log(this.file_store);
  //   } else {
  //     this.secondFormGroup.controls['vetLicense'].patchValue('');
  //     // Handle the case when no vetLicense file is selected
  //     this.file_store = [];
  //   }
  // }
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
