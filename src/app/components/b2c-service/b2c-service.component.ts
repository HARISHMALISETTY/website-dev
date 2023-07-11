import { Component } from '@angular/core';

@Component({
  selector: 'app-b2c-service',
  templateUrl: './b2c-service.component.html',
  styleUrls: ['./b2c-service.component.css']
})
export class B2cServiceComponent {
  data: any;
  constructor() {
    this.data = [
      {
        title: 'Sewage/ Drain',
        list: ['Sewage Tank Cleaning', 'Sewage Tank Clearing', 'Sewer & Drain Blockage'],
        backgroundImage: '/assets/Sewage-Drain_2.png',
        lightColor: false
      },
      {
        title: 'Housekeeping',
        list: ['House / Bathroom / Toilet / Kitchen', 'Deep Cleaning Services', 'Pest Control', 'Sanitization', 'Water Tank Cleaning'],
        backgroundImage: '/assets/Housekeeping.png',
        lightColor: true
      },
      {
        title: 'Waste Management',
        list: ['e-Waste Pick up', 'Bio-Medical Waste Pick up'],
        backgroundImage: '/assets/Waste_Management_2.png',
        lightColor: false
      },
    ]
  }

}
