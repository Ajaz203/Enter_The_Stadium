import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from '../../services/ticket.service';

import Swal from 'sweetalert2';
declare var AOS: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private service: TicketService) {
this.contactForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', Validators.required],
  reason: ['', Validators.required],
  message: ['', Validators.required]
});

  }

  ngAfterViewInit() {
    AOS.init({ duration: 1000, once: true });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we send your message.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.service.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          Swal.close();
          Swal.fire('Success!', 'Your message has been sent successfully.', 'success');
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
          this.isSubmitting = false;
        }
      });
    }
  }
}
