import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Product {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  accreditationProducts: Product[] = [
    { title: 'Plastic Cards', description: 'High-quality Teflon or PVC cards, with barcodes, RFID, and NFC options.', image: 'assets/3.3.avif' },
    { title: 'Lanyards', description: '12–40mm width, single/multicolored, matching your event branding.', image: 'assets/4.webp' },
    { title: 'Wristbands', description: 'Durable, premium fabric, waterproof paper, ideal for large-scale events.', image: 'assets/5.jpg' },
    { title: 'Breakaway Safety', description: 'All lanyards feature tested breakaway attachments for safety.', image: 'assets/6.jpg' },
    { title: 'Accreditation Software', description: 'Intuitive software for efficient data management & multi-layered vetting.', image: 'assets/7.png' }
  ];
}
