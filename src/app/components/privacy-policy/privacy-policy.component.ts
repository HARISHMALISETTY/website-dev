import { Component, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PrivacyPolicyComponent {
  privacyPolicy = "";
  errorMessage = "";

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getPrivacyPolicy();
  }

  async getPrivacyPolicy() {
    (await this.commonService.getPrivacyPolicy()).subscribe((response: any) => {
      if (response.status === 'SUCCESS') {
        this.privacyPolicy = response.data.privacyPolicy;
      } else {
        this.errorMessage = "Error retrieving privacy policy. Please try again later.";
      }
    });
  }
}
