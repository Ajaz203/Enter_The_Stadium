import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// Define the Post interface
interface Post {
url: string;
  id: string;
  title: string;
  description: string;
  image?: string;
}
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
 
  API = "https://ajaz-backend.onrender.com";

  postsForCards: Post[] = [];
  loadingCards = false;
  errorCards: string | null = null;
   constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.loadingCards = true;
    this.errorCards = null;

    this.http.get<any>(`${this.API}/get-posts`).subscribe({
      next: (res) => {
        this.postsForCards = res.data.map((post: Post) => ({
          ...post,
          image: post.image ? `${this.API}/uploads/${post.image}` : 'assets/default-post.jpg' // fallback image
        }));
        this.loadingCards = false;
      },
      error: (err) => {
        console.error(err);
        this.errorCards = "Failed to load posts";
        this.loadingCards = false;
      }
    });
  }
  openUrl(url: string) {
  if (!url) {
    this.toastr.warning('Buy link not available');
    return;
  }

  window.open(url, '_blank');
}

  ngAfterViewInit(): void {
     setTimeout(() => {
       if (this.postsForCards.length > 0) {
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





















 // tickets: any[] = [];
  // featuredEvents: any[] = [];
  // loading: boolean = true;
  // error: string = '';

  // apiKey: string = 'QDlCJV2YMLjMLAITNL3JNJ7y4ZlmUDsP';
  // countryCode: string = 'US'; 

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchMusicConcerts();
  // }

  // fetchMusicConcerts(): void {
  //   this.loading = true;
  //   this.error = '';

  //   const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.countryCode}&classificationName=music&size=20&apikey=${this.apiKey}`;

  //   this.http.get<any>(url).subscribe({
  //     next: (res) => {
  //       this.loading = false;
  //       if (res._embedded && res._embedded.events) {
  //         this.tickets = res._embedded.events;
  //         this.featuredEvents = this.tickets.slice(0, 5); 
  //       } else {
  //         this.tickets = [];
  //         this.featuredEvents = [];
  //         this.error = 'No music concerts available.';
  //       }
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       console.error(err);
  //       this.error = 'Error fetching music concerts.';
  //     }
  //   });
  // }

  // getEventImage(event: any): string {
  //   if (event.images && event.images.length > 0) {
  //     const img = event.images.find((i: any) => i.ratio === '16_9') || event.images[0];
  //     return img.url;
  //   }
  //   return 'assets/default-event.jpg';
  // }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     if (this.featuredEvents.length > 0) {
  //       new Swiper('.swiper', {
  //         slidesPerView: 1,
  //         spaceBetween: 20,
  //         loop: true,
  //         autoplay: { delay: 3000 },
  //         navigation: {
  //           nextEl: '.swiper-button-next',
  //           prevEl: '.swiper-button-prev',
  //         },
  //         breakpoints: {
  //           640: { slidesPerView: 2 },
  //           1024: { slidesPerView: 3 }
  //         }
  //       });
  //     }
  //   }, 1000);
  // }