import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ReactiveFormsModule } from '@angular/forms';

import { Device } from '@awesome-cordova-plugins/device/ngx';

// custom components
import { HeroComponent } from './components/hero/hero.component';
import { BookAppointmentCardComponent } from './components/book-appointment-card/book-appointment-card.component';
import { HeaderComponent } from './components/header/header.component';
import { ServicePackagesComponent } from './components/service-packages/service-packages.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { B2bServiceComponent } from './components/b2b-service/b2b-service.component';
import { B2cServiceComponent } from './components/b2c-service/b2c-service.component'

// angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { JoinUsFormComponent } from './components/join-us-form/join-us-form.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { DownloadAppComponent } from './components/download-app/download-app.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { CancellationPolicyComponent } from './components/cancellation-policy/cancellation-policy.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BillDeskComponent } from './components/bill-desk/bill-desk.component';
import { OurServicesComponent } from './components/our-services/our-services.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    BookAppointmentCardComponent,
    HeaderComponent,
    ServicePackagesComponent,
    TestimonialsComponent,
    ServiceCardComponent,
    FaqsComponent,
    B2bServiceComponent,
    B2cServiceComponent,
    AboutUsComponent,
    FooterComponent,
    JoinUsFormComponent,
    ContactUsComponent,
    HomeComponent,
    DownloadAppComponent,
    BookAppointmentComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    SafeHtmlPipe,
    CancellationPolicyComponent,
    PageNotFoundComponent,
    BillDeskComponent,
    OurServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    SwiperModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgOtpInputModule,
    GooglePlaceModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NgxGoogleAnalyticsModule.forRoot('GTM-PXZ3NJQ'),
    NgxGoogleAnalyticsModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    Device
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
