import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
@ViewChild('ticketsSlider', { static: false }) ticketsSlider!: ElementRef<HTMLDivElement>;
 @ViewChild('testimonialsSlider', { static: false }) testimonialsSlider!: ElementRef<HTMLDivElement>;
 tickets = [
    {
      title: 'FIFA World Cup Final',
      description: 'Watch the biggest football match live from the stadium.',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Wimbledon Championship',
      description: 'Experience the world’s oldest tennis tournament in London.',
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'F1 Grand Prix',
      description: 'Feel the adrenaline rush of Formula 1 racing up close.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Super Bowl Experience',
      description: 'Catch the excitement of the world’s biggest football event.',
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'UEFA Champions League',
      description: 'Watch Europe’s best football clubs battle for glory.',
      image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Coldplay Live Concert',
      description: 'Enjoy a night of music, lights, and emotions with Coldplay.',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Cricket World Cup',
      description: 'Cheer for your team in the most exciting cricket event.',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'NBA Finals',
      description: 'Witness the ultimate basketball showdown of the year.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  testimonials = [
    { name: 'Rahul Sharma', feedback: 'Booking was super smooth! Got my tickets fast.' },
    { name: 'Priya Verma', feedback: 'Amazing support and great experience!' },
    { name: 'Aman Gupta', feedback: 'Loved the smooth process — can’t wait for the next event!' },
    { name: 'Sanya Mehta', feedback: 'Fantastic customer service and quick updates!' },
    { name: 'Rohit Nair', feedback: 'The whole experience felt premium and hassle-free.' },
    { name: 'Nisha Rao', feedback: 'Truly a one-stop platform for live event lovers.' }
  ];

features = [
  { icon: 'fas fa-crown', title: 'Expertise', description: 'Our team brings years of proven experience across diverse industries.' },
  { icon: 'fas fa-bolt', title: 'Innovation', description: 'We combine creativity and technology to deliver cutting-edge solutions.' },
  { icon: 'fas fa-handshake', title: 'Reliability', description: 'Our clients trust us for consistent, transparent, and timely delivery.' },
];


steps = [
  { id: 1, title: 'Submit Request', description: 'Start by providing your event details and ticketing needs.' },
  { id: 2, title: 'Get Confirmation', description: 'Our team validates requirements and confirms the process.' },
  { id: 3, title: 'Processing & Setup', description: 'We prepare your customized ticketing and accreditation solutions.' },
  { id: 4, title: 'Delivery & Support', description: 'Receive your materials with continuous event-time assistance.' }
];

 
 private autoScrollTimer: any = null;
  private isPaused = false;
  private cardsPerView = 4; // default for desktop
  private cardGap = 15; // px (match CSS gap)

  /* ----- lifecycle ----- */
// Auto-scroll
ngAfterViewInit() {
  setInterval(() => {
    this.scrollTickets('right');
  }, 4000);
     setInterval(() => this.scrollTestimonials('right'), 4000);
}
  ngOnDestroy() {
    this.stopAutoScroll();
  }

  /* update cards per view on resize */
  @HostListener('window:resize')
  onResize() {
    this.updateCardsPerView();
  }

  private updateCardsPerView() {
    const w = window.innerWidth;
    if (w <= 480) this.cardsPerView = 1;
    else if (w <= 768) this.cardsPerView = 2;
    else if (w <= 992) this.cardsPerView = 3;
    else this.cardsPerView = 4;
  }

  /* compute one-card scroll amount (card width + gap) */
  private getCardScrollAmount(): number {
    const slider = this.ticketsSlider?.nativeElement;
    if (!slider) return 320;
    // cardWidth = slider.clientWidth * (1 / cardsPerView) - gap correction
    const totalGap = (this.cardsPerView - 1) * this.cardGap;
    const cardWidth = (slider.clientWidth - totalGap) / this.cardsPerView;
    return Math.round(cardWidth + this.cardGap);
  }

  /* arrow click */
 scrollTickets(direction: string) {
    const slider = this.ticketsSlider.nativeElement;
    const cardWidth = slider.querySelector('.ticket-card')?.clientWidth || 300;
    const scrollAmount = cardWidth + 20; // smooth spacing

    if (direction === 'right') {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        // reached end → reset to start
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (slider.scrollLeft <= 0) {
        // reached start → jump to end
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  }
  scrollTestimonials(direction: 'left' | 'right') {
    const slider = this.testimonialsSlider.nativeElement;
    const cardWidth = slider.querySelector('.testimonial-card')?.clientWidth || 300;
    const scrollAmount = cardWidth + 20;

    if (direction === 'right') {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (slider.scrollLeft <= 0) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  }

  /* auto-scroll logic: move one card every interval */
  startAutoScroll() {
    this.stopAutoScroll();
    this.autoScrollTimer = setInterval(() => {
      if (this.isPaused) return;
      this.scrollTickets('right');
    }, 3000); // 3s per card
  }
  stopAutoScroll() {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }
  pauseAutoScroll() { this.isPaused = true; }
  resumeAutoScroll() { this.isPaused = false; }

  /* optional controls so you can call from template if needed */
  resumeAndRestart() {
    this.isPaused = false;
    this.startAutoScroll();
  }
}
