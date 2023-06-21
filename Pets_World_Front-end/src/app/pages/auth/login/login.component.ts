import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.email!.value;
      const password = this.password!.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('Successfully logged');
        },
        error: (err) => {
          this.loginError = 'Invalid email or password.';
        },
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}
