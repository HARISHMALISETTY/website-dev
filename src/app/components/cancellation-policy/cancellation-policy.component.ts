import { Component, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CancellationPolicyComponent {
  cancellationPolicy = "";
  errorMessage = "";

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getCancellationPolicy();
  }

  async getCancellationPolicy() {
    (await this.commonService.getCancellationPolicy()).subscribe((response: any) => {
      if (response.status === 'SUCCESS') {
        this.cancellationPolicy = response.data.cancellationPolicy;
      } else {
        this.errorMessage = "Error retrieving cancellation policy. Please try again later.";
      }
    });
  }
}
