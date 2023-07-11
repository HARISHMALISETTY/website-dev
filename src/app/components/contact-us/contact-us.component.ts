import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  center: google.maps.LatLngLiteral = { lat: 19.2037, lng: 72.9684 };
  zoom = 18;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
}
