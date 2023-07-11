import { Injectable } from '@angular/core';
import { REST_APIS } from '../RestApis';

import { environment } from '../../../environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpService: HttpService) { }

  sendOtp(data: any) {
    const url = environment.API_URL + REST_APIS.sendOTP;
    return this.httpService.post(url, data);
  }

  verifyOTP(data: any) {
    const url = environment.API_URL + REST_APIS.verifyOTP;
    return this.httpService.post(url, data);
  }

  // verifyLink(data) {
  //   const url = environment.API_URL + REST_APIS.verifySendLink;
  //   return this.httpService.post(url, data);
  // }

  // otpVerfication(data) {
  //   const url = environment.API_URL + REST_APIS.otpVerification;
  //   return this.httpService.postLogin(url, data);
  // }

}
