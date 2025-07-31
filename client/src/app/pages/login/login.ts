import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {


   loginForm: FormGroup;
    error = '';
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) 
  {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  if (this.auth.isLoggedIn()) {
    this.router.navigate(['/dashboard']);
  }
}
  
  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}


