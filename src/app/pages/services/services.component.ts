import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
interface Product {
  title: string;
  description: string;
  image: string;
}
interface IdCardType {
  title: string;
  images: string[];
  description: string;
  activeImage?: number;
  specs?: string[];
}

@Component({
  selector: 'app-services',
  imports: [CommonModule,RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  constructor(private router: Router, private viewportScroller: ViewportScroller, private route: ActivatedRoute) { }

ngAfterViewInit() {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      }, 200);
    }
  });
}
  accreditationProducts: Product[] = [
    { title: 'Plastic Cards', description: 'High-quality Teflon or PVC cards, with barcodes, RFID, and NFC options.', image: 'assets/3.3.avif' },
    { title: 'Lanyards', description: '12–40mm width, single/multicolored, matching your event branding.', image: 'assets/4.webp' },
    { title: 'Wristbands', description: 'Durable, premium fabric, waterproof paper, ideal for large-scale events.', image: 'assets/5.jpg' },
    { title: 'Breakaway Safety', description: 'All lanyards feature tested breakaway attachments for safety.', image: 'assets/6.jpg' },
    { title: 'Accreditation Software', description: 'Intuitive software for efficient data management & multi-layered vetting.', image: 'assets/7.png' }
  ];
  ngOnInit() {
    this.idCardTypes = this.idCardTypes.map(item => ({
      ...item,
      activeImage: 0
    }));
  }

  idCardTypes: IdCardType[] = [
    {
      title: "Multicolor Printing PVC Photo ID Card",
      images: [
        "/assets/cards/1.webp",
        "/assets/cards/2.webp",
        "/assets/cards/3.webp"
      ],
      description: "High-quality PVC ID cards with multicolor digital printing and glossy finish."
    },
    {
      title: "Customizable ID Card With Printed Lanyard",
      images: [
        "/assets/cards/4.webp",
        "/assets/cards/4.1.webp",
        "/assets/cards/4.2.webp"
      ],
      description: "Durable customized ID cards with full-color printed lanyards for schools & offices."
    },
    {
      title: "College ID Card",
      images: [
        "/assets/cards/5.1.webp",
        "/assets/cards/5.2.webp",
        "/assets/cards/5.3.webp",
        "/assets/cards/5.4.webp"
      ],
      description: "Glossy PVC college ID cards with digital printing, lightweight, long-lasting."
    },
    {
      title: "ID Card Lanyard",
      images: [
        "/assets/cards/6.1.webp",
        "/assets/cards/4.1.webp",
        "/assets/cards/6.3.webp"
      ],
      description: "Strong, offset-printed lanyard cards used for corporate and institutional IDs."
    },
    {
      title: "Rectangular PVC ID Card",
      images: [
        "/assets/cards/7.1.webp",
        "/assets/cards/7.2.webp",
        "/assets/cards/5.4.webp"
      ],
      description: "Standard PVC ID cards with CR80 dimensions and vibrant printing."
    },
    {
      title: "School ID Card",
      images: [
        "/assets/cards/11.1.webp",
        "/assets/cards/11.2.webp"
      ],
      description: "Durable school ID cards with glossy finish and high-quality digital print."
    },
    {
      title: "Digital ID Card",
      images: [
        "/assets/cards/8.webp"
      ],
      description: "Smart digital ID card featuring digitally encoded identity information."
    },
    {
      title: "Plastic Identification Cards",
      images: [
        "/assets/cards/9.webp"
      ],
      description: "Strong plastic ID cards suitable for corporate, school & government use."
    },
    {
      title: "Multicolor Plastic ID Card Holder With Lanyard",
      images: [
        "/assets/cards/10.1.webp",
        "/assets/cards/10.2.webp",
        "/assets/cards/10.3.webp"
      ],
      description: "Printed lanyard ID holders with vibrant color options and durable quality."
    }
  ];

  pvcCards = [{ title: "ASI Plain White PVC Cards", images: ["assets/pvc/1.1.webp", "assets/pvc/1.2.webp", "assets/pvc/1.3.webp"], description: "High-quality glossy blank PVC cards, designed for lamination and long-term durability.", specs: ["Card Type: Blank Card", "Material: PVC", "Finish: Glossy", "Shape: Square", "Coating: Lamination"], activeImage: 0 }, { title: "Blank PVC ID Card", images: ["assets/pvc/2.1.webp", "assets/pvc/2.2.webp", "assets/pvc/2.3.webp",], description: "Premium blank PVC cards ideal for office, college, or professional identity use.", specs: ["Material: PVC", "Finish: Glossy", "Shape: Square", "Holder Type: Plastic Lamination"], activeImage: 0 }, { title: "PVC Blank White Card", images: ["assets/pvc/3.1.webp", "assets/pvc/3.2.webp",], description: "Non-laminated blank PVC cards with glossy finish and long-lasting print compatibility.", specs: ["Card Type: Blank", "Material: PVC", "Finish: Glossy", "Shape: Square", "Lamination: No"], activeImage: 0 }, { title: "Multicolor Election PVC Card", images: ["assets/pvc/4.webp",], description: "Matte-finish printed PVC cards suitable for election identity and event access.", specs: ["Card Type: ID Cards", "Material: PVC", "Finish: Matte", "Shape: Square", "Coating: Lamination"], activeImage: 0 }, { title: "PVC ID Card", images: ["assets/pvc/5.webp",], description: "Premium PVC cards used across industries with perfect CR80 standard dimensions.", specs: ["Color: White", "Finish: Glossy", "Dimensions: 86 × 54 mm", "Thickness: 0.7–0.9 mm"], activeImage: 0 }, { title: "ID Card Printing", images: ["assets/pvc/6.1.webp", "assets/pvc/6.2.webp", "assets/pvc/6.3.webp", "assets/pvc/6.4.webp",], description: "Offset-printed double-sided PVC ID cards for corporate, schools, and events.", specs: ["Material: PVC", "Type: Double Sided", "Technology: Offset Printing", "Holder: Lanyard Supported"], activeImage: 0 }];

  activeTab = 'idcards';

  nextImage(card: any) {
    card.activeImage = (card.activeImage + 1) % card.images.length;
  }

  prevImage(card: any) {
    card.activeImage =
      (card.activeImage - 1 + card.images.length) % card.images.length;
  }


}
