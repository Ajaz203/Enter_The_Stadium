import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Ticket {
  id?: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  API = "http://localhost:5000/api/tickets";

  tickets: Ticket[] = [];

  // ADD FORM
  newTicket: Ticket = { title: '', description: '', image: '' };
  newImageFile: File | null = null;
  newImagePreview: string | ArrayBuffer | null = null;

  // EDIT FORM
  editingTicket: Ticket | null = null;
  editImageFile: File | null = null;
  editImagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.getTickets();
  }

  // GET ALL
  getTickets() {
    this.http.get<Ticket[]>(this.API).subscribe({
      next: (res) => this.tickets = res,
      error: () => this.toastr.error("Failed to load tickets", "Error")
    });
  }

  // -----------------------------
  // ADD TICKET
  // -----------------------------
  addTicket() {
    if (!this.newTicket.title || !this.newTicket.description) {
      this.toastr.error("Please fill all fields", "Error");
      return;
    }

    const form = new FormData();
    form.append("title", this.newTicket.title);
    form.append("description", this.newTicket.description);

    if (this.newImageFile) {
      form.append("image", this.newImageFile);
    }

    this.http.post(this.API, form).subscribe({
      next: () => {
        this.toastr.success("Ticket added successfully", "Success");
        this.getTickets();
        this.newTicket = { title: '', description: '', image: '' };
        this.newImageFile = null;
        this.newImagePreview = null;
      },
      error: () => this.toastr.error("Failed to add ticket", "Error")
    });
  }

  selectTicket(ticket: Ticket) {
    this.editingTicket = { ...ticket };
    this.editImagePreview = ticket.image; // existing preview
  }

  // PREVIEW - EDIT
// ADD TICKET PREVIEW
onNewFileSelect(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.newImageFile = file;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.newImagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
}

// EDIT PREVIEW
onEditFileSelect(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.editImageFile = file;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.editImagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
}


  updateTicket() {
    if (!this.editingTicket) return;

    const form = new FormData();
    form.append("title", this.editingTicket.title);
    form.append("description", this.editingTicket.description);

    if (this.editImageFile) {
      form.append("image", this.editImageFile);
    }

    this.http.put(`${this.API}/${this.editingTicket.id}`, form).subscribe({
      next: () => {
        this.toastr.success("Ticket updated successfully", "Updated");
        this.getTickets();
        this.editingTicket = null;
        this.editImageFile = null;
        this.editImagePreview = null;
      },
      error: () => this.toastr.error("Failed to update ticket", "Error")
    });
  }

  // DELETE
  deleteTicket(ticket: Ticket) {
    this.http.delete(`${this.API}/${ticket.id}`).subscribe({
      next: () => {
        this.toastr.success("Ticket deleted", "Deleted");
        this.getTickets();
      },
      error: () => this.toastr.error("Failed to delete ticket", "Error")
    });
  }

  cancelEdit() {
    this.editingTicket = null;
    this.editImagePreview = null;
    this.editImageFile = null;
  }

  logout() {
    localStorage.removeItem("loggedIn");
    this.router.navigate(['/']);
  }
}
