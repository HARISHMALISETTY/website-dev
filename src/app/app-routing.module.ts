import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { CancellationPolicyComponent } from './components/cancellation-policy/cancellation-policy.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { OurServicesComponent } from './components/our-services/our-services.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'book-appointment',
    component: BookAppointmentComponent
  },
  {
    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'our-services',
    component: OurServicesComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'cancellation-policy',
    component: CancellationPolicyComponent
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
