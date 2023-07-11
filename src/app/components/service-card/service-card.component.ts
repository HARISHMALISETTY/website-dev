import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() title: any = 'Facility Management'
  @Input() list: any = ['Cleaning Services (Daily/ Monthly/ Quaterly/ Annual', 'Pest Control', 'Sanitization', 'Water Tank Cleaning'];
  @Input() backgroundImage: any = '/assets/Sewage Drain_Services.png';
  @Input() lightColor: any = false;

  activeId = 0;
  constructor() { }

  setActiveId(id: number) {
    this.activeId = id;
  }

}
