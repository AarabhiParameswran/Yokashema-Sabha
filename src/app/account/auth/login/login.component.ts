import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  error: string = '';
  returnUrl: string = '';
  fieldTextType: boolean = false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private store: Store,
    private authFackservice: AuthfakeauthenticationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    
    // form validation
    this.loginForm = this.formBuilder.group({
      memberId: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.loginForm.controls; 
  }

  /**
   * Form submit
   */
  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    const payload = {
      memberId : this.f['memberId'].value,
      mobileNumber : this.f['mobileNumber'].value,
      otp : this.f['otp'].value
    }
    

    // Show loader
    const loader = document.getElementById('elmLoader');
    if (loader) {
      loader.classList.remove('d-none');
    }

    // Login Api
this.authenticationService.login(payload).subscribe({
      next: (response: any) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        TokenStorageService.setAccessToken(response.accessToken);
        const expireInSeconds = response.expiresIn
        const expirationTime = Date.now() + (expireInSeconds * 1000);
        localStorage.setItem("expireIn", expirationTime.toString());

        // this.authService.scheduleTokenTimers();
        this.router.navigate(['/']);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        document.getElementById('elmLoader')?.classList.add('d-none');
        console.error(error);
        this.error = error.error?.detail || 'Invalid username or password';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: this.error,
        });
      },
      complete: () => {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });  }

  /**
   * Toggle OTP visibility
   */
  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.submitted = false;
    this.error = '';
    this.loginForm.reset();
  }
}