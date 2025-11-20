import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var Swiper: any;

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  tickets: any[] = [];
  featuredEvents: any[] = [];
  loading: boolean = true;
  error: string = '';

  apiKey: string = 'QDlCJV2YMLjMLAITNL3JNJ7y4ZlmUDsP';
  countryCode: string = 'US'; // Use US for live data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMusicConcerts();
  }

  fetchMusicConcerts(): void {
    this.loading = true;
    this.error = '';

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.countryCode}&classificationName=music&size=20&apikey=${this.apiKey}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.loading = false;
        if (res._embedded && res._embedded.events) {
          this.tickets = res._embedded.events;
          this.featuredEvents = this.tickets.slice(0, 5); // first 5 for slider
        } else {
          this.tickets = [];
          this.featuredEvents = [];
          this.error = 'No music concerts available.';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.error = 'Error fetching music concerts.';
      }
    });
  }

  getEventImage(event: any): string {
    if (event.images && event.images.length > 0) {
      const img = event.images.find((i: any) => i.ratio === '16_9') || event.images[0];
      return img.url;
    }
    return 'assets/default-event.jpg';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.featuredEvents.length > 0) {
        new Swiper('.swiper', {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 3000 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        });
      }
    }, 1000);
  }
}
