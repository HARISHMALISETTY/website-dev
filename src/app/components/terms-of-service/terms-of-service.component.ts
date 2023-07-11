import { Component, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TermsOfServiceComponent {
  termsAndConditions = "";
  errorMessage = "";


  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getTermsAndConditions();
  }

  async getTermsAndConditions() {
    (await this.commonService.getTermsAndConditions()).subscribe(async (response: any) => {
      if (response.status === 'SUCCESS') {
        this.termsAndConditions = response.data.termsAndConditions;
      } else {
        this.errorMessage = 'Error fetching terms and conditions. Please try again later.';
      }
    });
  }

}
