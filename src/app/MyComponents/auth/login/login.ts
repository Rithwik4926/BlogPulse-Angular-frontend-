import { Component } from '@angular/core';
import { LoginRequest } from '../../../shared/auth/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.model = {
      email: '',
      password: '',
    };
  }

  onSubmit(): void{
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        // set auth cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        // set the user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        })

        // redirect them back to home
        this.router.navigateByUrl('/');

      }
    });
  }

}
