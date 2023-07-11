import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Virtual, Pagination, Autoplay]);

@Component({
  selector: 'app-b2b-service',
  templateUrl: './b2b-service.component.html',
  styleUrls: ['./b2b-service.component.css']
})
export class B2bServiceComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent["loopedSlides"];
  breakpoints: any;
  sewageData: any;
  houseKeepingData:any;
  constructor() {
    this.sewageData = [
      {
        title: 'Sewage/ Drain',
        titleImage:'/assets/Sewage-Drain_1.png',
        list: [{
          title: 'Sewage Tank Clearing & Sewage Tank Cleaning', desc: `The service partners will use vacuum pumps and the vehicle-mounted tank to clear the septic tank.  The vacuum pumps will suck the sludge and fill the vehicle-mounted tank. This sludge will be later taken away for prompt and proper disposal. Our service partners will clean the septic tank internally. The walls of the septic tank will be scraped and cleaned to make it sludge-free.
           The residue would be pumped out and treated with cleaning agents. `,
            },
       {
          title: 'Sewer & Drain Blockage', desc: `We offer blockage removing services for sewer and drain blockages. Our service partners
        are well equipped to remove any sort of blockage that is troubling you.
        This may be in any type/size of pipe.`}
        ],
        backgroundImage: '/assets/Sewage Drain_Services.jpg',
        lightColor: true
      }];
      this.houseKeepingData=[
        {
        title: 'Housekeeping',
        list: [
          {
            title: 'House / Bathroom / Kitchen', desc: `We provide specialized home deep cleaning services. You may opt for a single service
          for your Bathroom / Kitchen / Living room or get a package for the entire house. Our experts will ensure
          a no-disturbance service.
          Our service partners will use the best tools and agents for an awesome experience.`},
          {
            title: 'Pest Control', desc: `Our service partners have the best equipment and amazing experience to carry out the
          pest control service.
          We offer eco-friendly options as pest control solutions. You may choose the type of solution which best fits your
          choice.` },
          {
            title: 'Sanitization', desc: `Since the outbreak of the Pandemic, sanitization has become an important need. This
          service helps to maintain a healthy environment in a literal sense. It not only helps to keep the COVID 19 virus
          away but also other harmful viruses and bacteria.
          Disinfecting the workplace also sends a message to your employees that “You Care” about them.` },
          {
            title: 'Water Tank Cleaning', desc: `Water Tank cleaning service ensures that the water storage tank is free from
          impurities, algae, and sludge. Frequent tank cleaning eliminates the risk of impurities and algae formation in the
          water tank.
          The inner walls of the tank will be cleaned to ensure maximum cleanliness of the storage tank.` }
        ],
        backgroundImage: '/assets/Housekeeping_Services.jpg',
        lightColor: false
      },
    ];

    this.breakpoints = {
      '0': {
        slidesPerView: 1,
        spaceBetween: 0
      },
      '640': {
        slidesPerView: 2,
        spaceBetween: 0
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 40
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 0
      },
      '1440': {
        slidesPerView: 4,
        spaceBetween: 0
      }
    };
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  
}
