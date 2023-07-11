import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Virtual, Pagination, Autoplay]);

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  breakpoints: any;

  constructor() {
    this.breakpoints = {
      '0': {
        slidesPerView: 1,
        spaceBetween: 10
      },
      '640': {
        slidesPerView: 2,
        spaceBetween: 20
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
