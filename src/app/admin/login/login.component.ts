import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted = false;
  loginError: string = "";

  // Static Login Credentials
  validEmail = "admin@gmail.com";
  validPassword = "12345";

  constructor(private fb: FormBuilder ,private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    if (email === this.validEmail && password === this.validPassword) {
      this.loginError = "";
      alert("Login Successful!");

      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = "Invalid email or password!";
    }
  }
}
