import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Virtual, Pagination, Autoplay]);

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.css']
})
export class ServicePackagesComponent {
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
      // '768': {
      //   slidesPerView: 3,
      //   spaceBetween: 40
      // },
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
