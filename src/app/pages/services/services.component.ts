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
  { title: 'Plastic Cards', description: 'High-quality Teflon or PVC cards, with barcodes, RFID, and NFC options.', image: 'assets/products/3.3.avif' },
  { title: 'Lanyards', description: '12–40mm width, single/multicolored, matching your event branding.', image: 'assets/products/4.webp' },
  { title: 'Wristbands', description: 'Durable, premium fabric, waterproof paper, ideal for large-scale events.', image: 'assets/products/5.jpg' },
  { title: 'Breakaway Safety', description: 'All lanyards feature tested breakaway attachments for safety.', image: 'assets/products/6.jpg' },
  { title: 'Accreditation Software', description: 'Intuitive software for efficient data management & multi-layered vetting.', image: 'assets/products/7.png' }
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

LanyardsTypes = [
   {
      title: "Customizable ID Card With Printed Lanyard",
      images: [
        "/assets/cards/4.webp",
        "/assets/cards/4.1.webp",
        "/assets/cards/4.2.webp"
      ],
       activeImage: 0,
      description: "Durable customized ID cards with full-color printed lanyards for schools & offices."
    },
 {
      title: "ID Card Lanyard",
      images: [
        "/assets/cards/6.1.webp",
        "/assets/cards/4.1.webp",
        "/assets/cards/6.3.webp"
      ],
      activeImage: 0,
      description: "Strong, offset-printed lanyard cards used for corporate and institutional IDs."
    },
   {
      title: "Multicolor Plastic ID Card Holder With Lanyard",
      images: [
        "/assets/cards/10.1.webp",
        "/assets/cards/10.2.webp",
        "/assets/cards/10.3.webp"
      ],
      activeImage: 0,
      description: "Printed lanyard ID holders with vibrant color options and durable quality."
    }

];


  wristbandTypes: IdCardType[] = [
    // {
    //   title: "Multicolor Plastic ID Card Holder With Lanyard",
    //   images: [
    //     "assets/2.1.webp",
      
    //   ],
    //   description: "Printed lanyard ID holders with vibrant color options and durable quality.",
    //   activeImage: 0
    // },
    {
      title: "Multicolor Tyvek Wrirtband - Non Tearable writbands ",
      images: [
        "assets/multli color tyvek writband.jpeg",
      
      ],
      description: "",
      activeImage: 0
    },
    {
      title: "Single Color Printed Tyvek Wrirtband - Non-Tearable Wristbands ",
      images: [
        "assets/printed tyvek.jpeg",
      
      ],
      description: "",
      activeImage: 0
    },
    {
      title: "Multi Color Tyvek Wrirtband - Non-Tearable Wristbands ",
      images: [
        "assets/tyvek wristband.jpeg",
      
      ],
      description: "",
      activeImage: 0
    },
    {
      title: "Fabric Writband Multicolor ",
      images: [
        "assets/fabric writsband.jpeg",
      
      ],
      description: "",
    },
    {
      title: "Silicon custom print writband",
      images: [
        "assets/rubber writband.jpeg",
      
      ],
      description: "",
    }
  ];

  activeTab = 'idcards';

  nextImage(card: any) {
    card.activeImage = (card.activeImage + 1) % card.images.length;
  }

  prevImage(card: any) {
    card.activeImage =
      (card.activeImage - 1 + card.images.length) % card.images.length;
  }


}
