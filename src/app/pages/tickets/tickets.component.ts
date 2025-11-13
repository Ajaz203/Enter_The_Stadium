import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  imports: [RouterLink,CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
tickets = [
    {
      title: 'FIFA World Cup Final',
      description: 'Experience the world’s biggest football event live!',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
    },
    {
      title: 'Coldplay Live Concert',
      description: 'Feel the magic of music with Coldplay’s stunning live show.',
      image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
    },
    {
      title: 'Formula 1 Grand Prix',
      description: 'Catch the speed, thrill, and adrenaline rush live at F1.',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d'
    },
    {
      title: 'Cricket World Cup',
      description: 'Witness the world’s best teams battle for the trophy.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'
    },
    {
      title: 'Wimbledon Finals',
      description: 'Experience tennis at its finest on the world’s best court.',
      image: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be'
    },
    {
      title: 'NBA Playoffs',
      description: 'Feel the energy of the NBA’s most thrilling matchups.',
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a'
    }
  ];
}
