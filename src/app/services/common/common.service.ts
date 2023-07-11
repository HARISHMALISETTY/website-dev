import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityService } from '../city/city.service';
import { HttpService } from '../http/http.service';
import { REST_APIS } from '../RestApis';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  city: any;

  constructor(private httpService: HttpService, private cityService: CityService) {
    this.cityService.getCity().subscribe(city => {
      this.city = city;
    });
  }

  bookAppointment(data: any) {
    const url = environment.API_URL + REST_APIS.registerConsumer;
    return this.httpService.post(url, data);
  }

  async getServiceCategories(city: string) {
    const url = environment.API_URL + REST_APIS.getServiceCategories.replace(':city', city);
    return this.httpService.get(url);
  }


  async getSubServiceCategories(data: any) {
    const url = environment.API_URL + REST_APIS.getSubServiceCategories;
    return this.httpService.post(url, data);
  }

  async getAddressCategories() {
    const url = environment.API_URL + REST_APIS.addressCategories;
    return this.httpService.get(url);
  }

  async getAllCities() {
    const url = environment.API_URL + REST_APIS.allCities;
    return this.httpService.get(url);
  }

  async getFaqs() {
    const url = environment.API_URL + REST_APIS.faqs;
    return this.httpService.get(url);
  }

  async registerServicePartner(data: any) {
    const url = environment.sales_API_URL + REST_APIS.registerServicePartner;
    return this.httpService.postWithoutHeaders(url, data);
  }

  async uploadResume(data: any) {
    const url = environment.sales_API_URL + REST_APIS.uploadResume;
    return this.httpService.uploadResume(url, data);
  }

  getPrivacyPolicy() {
    const url = environment.API_URL + REST_APIS.privacyPolicy;
    return this.httpService.get(url);
  }

  getTermsAndConditions() {
    const url = environment.API_URL + REST_APIS.termsAndConditions;
    return this.httpService.get(url);
  }

  getCancellationPolicy() {
    const url = environment.API_URL + REST_APIS.cancellationPolicy;
    return this.httpService.get(url);
  }

  callMeBack(mobileNo: any) {
    const url = environment.API_URL + REST_APIS.callMeBack.replace(':mobileNo', mobileNo);
    return this.httpService.get(url);
  }

  createOrder(data: object) {
    const url = environment.API_URL + REST_APIS.createOrder;
    return this.httpService.post(url, data);
  }

  retrieveOrder(data: object) {
    const url = environment.API_URL + REST_APIS.retrieveOrder;
    return this.httpService.post(url, data);
  }

  getPublicIpAddress() {
    const url = 'https://api64.ipify.org?format=json';
    return this.httpService.getWithoutHeaders(url);
  }
  async getPrePayments() {
    const url = environment.API_URL + REST_APIS.enablePrePayments.replace(':city', this.city);
    return this.httpService.get(url);
  }

  async checkServiceArea(city: string, lat: any, lng: any) {
    const url = environment.API_URL + REST_APIS.checkServiceArea
      .replace(':city', city)
      .replace(":lat", lat)
      .replace(':lng', lng);
    return this.httpService.get(url);
  }
}
