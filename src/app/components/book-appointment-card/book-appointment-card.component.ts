import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-book-appointment-card',
  templateUrl: './book-appointment-card.component.html',
  styleUrls: ['./book-appointment-card.component.css']
})
export class BookAppointmentCardComponent {
  selectedTabIndex: any;
  mobileNo = '';
  successMessage: any;
  errorMessage: any;

  constructor(private commonService: CommonService) { }


  setSelectedTabIndex(index: any) {
    this.selectedTabIndex = index;
  }

  async callMeBack() {
    if (this.mobileNo.length !== 10 || isNaN(Number(this.mobileNo))) {
      this.successMessage = '';
      this.errorMessage = 'Please enter valid contact number';
      return;
    } else {
      this.successMessage = '';
      this.errorMessage = '';
    }

    console.log('mobile ', this.mobileNo);
    (await this.commonService.callMeBack(this.mobileNo)).subscribe((res: any) => {
      if (res.status === 'SUCCESS') {
        this.successMessage = "Thanks for submitting your number. We'll call you shortly.";
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = res.error.message;
      }
    });
  }

}
