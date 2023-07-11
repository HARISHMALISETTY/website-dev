import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AutoplayOptions } from 'swiper/types';
SwiperCore.use([Virtual, Pagination, Autoplay]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeroComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  autoplayOptions: AutoplayOptions = {
    delay: 2500,
    disableOnInteraction: false
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
