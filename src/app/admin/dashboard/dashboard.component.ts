import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Ticket {
  id?: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {}
    tickets: Ticket[] = [
    { id: 1, title: 'FIFA World Cup Final', description: 'Watch the biggest football match live.', image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Wimbledon Championship', description: 'Experience the world’s oldest tennis tournament.', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80' }
  ];

  newTicket: Ticket = { id: 0, title: '', description: '', image: '' };
  editingTicket: Ticket | null = null;

  addTicket() {
    if (this.newTicket.title && this.newTicket.description && this.newTicket.image) {
      const newId = this.tickets.length ? Math.max(...this.tickets.map(t => t.id ?? 0)) + 1 : 1;
      this.tickets.push({ ...this.newTicket, id: newId });
      this.newTicket = { id: 0, title: '', description: '', image: '' };
    }
  }

  selectTicket(ticket: Ticket) {
    this.editingTicket = { ...ticket };
  }

  updateTicket() {
    if (this.editingTicket) {
      const index = this.tickets.findIndex(t => t.id === this.editingTicket!.id);
      if (index > -1) {
        this.tickets[index] = { ...this.editingTicket };
        this.editingTicket = null;
      }
    }
  }

  deleteTicket(ticket: Ticket) {
    const index = this.tickets.findIndex(t => t.id === ticket.id);
    if (index > -1) this.tickets.splice(index, 1);
  }

  cancelEdit() {
    this.editingTicket = null;
  }
  logout() {
  localStorage.removeItem("loggedIn");
  this.router.navigate(['/']);
}
}
