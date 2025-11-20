import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: TicketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  control(controlName: string) {
    return this.loginForm.get(controlName);
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toastr.warning('Please fill in all required fields', 'Warning');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Login Successful!', 'Success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastr.error('Invalid email or password!', 'Error');
      }
    });
  }
}
