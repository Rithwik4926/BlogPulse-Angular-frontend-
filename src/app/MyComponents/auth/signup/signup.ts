import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth/auth.services';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Registration failed. ' + (error.error?.title ?? '');
      }
    });
  }
}
