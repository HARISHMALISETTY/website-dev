import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city/city.service';
import { CommonService } from 'src/app/services/common/common.service';
import { FileValidator } from 'src/app/services/fileValidator';

@Component({
  selector: 'app-join-us-form',
  templateUrl: './join-us-form.component.html',
  styleUrls: ['./join-us-form.component.css']
})
export class JoinUsFormComponent {
  @Input() showEmployeeSignUpForm = false;
  @Input() title = 'Become Our Partner';
  @Input() description = `Please fill up the below form to join us as a Service Partner. We will
  get back to you to complete the remaining formalities.`;
  contactUsForm: FormGroup;
  successMessage: any;
  failureMessage: any;
  city: any;
  selelctedFile: any;
  submitting = false;

  get name() { return this.contactUsForm.get('name'); }
  get mobile() { return this.contactUsForm.get('mobile'); }
  get email() { return this.contactUsForm.get('email'); }
  get message() { return this.contactUsForm.get('message'); }
  get file() { return this.contactUsForm.get('file'); }

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private cityService: CityService) {

    this.cityService.getCity().subscribe(city => {
      this.city = city;
    });

    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(200)]],
      file: [''],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selelctedFile = file;
    }
  }

  async onSubmit() {
    this.submitting = true;
    if (this.showEmployeeSignUpForm) {
      this.file?.addValidators([Validators.required, FileValidator.fileType(['pdf', 'doc', 'docx'])]);
      this.file?.updateValueAndValidity();
    }

    if (this.contactUsForm.valid) {
      const { name, mobile, email, message, file } = this.contactUsForm.value;

      var data: any = {
        mobileNo: mobile,
        email,
        organizationName: "org",
        contactName: name,
        city: this.city,
        comment: message,
        leadStatus: "LEAD",
        userType: "Vendor",
        vendorType: "ORGANIZATION"
      };

      if (this.showEmployeeSignUpForm) {
        data = {
          mobileNo: mobile,
          email,
          organizationName: "org",
          contactName: name,
          city: this.city,
          comment: message,
          leadStatus: "LEAD",
          userType: "Vendor",
          vendorType: "INDIVIDUAL",
          images: []
        };

        const resumeData = {
          fileFormat: file.split('.').pop()?.toLowerCase(),
          mobile: mobile,
          file: this.selelctedFile
        };

        (await this.commonService.uploadResume(resumeData)).subscribe(async (res: any) => {
          if (res.status === 'Success') {
            data.images.push(res.data.images);
            (await this.commonService.registerServicePartner(data)).subscribe((res: any) => {
              if (res.status === 'Success') {
                this.submitting = false;
                this.successMessage = 'Submission successful! Thank you for your interest. We will get back to you soon. In the meantime, feel free to check out our FAQ section or follow us on social media for updates and tips.';
                this.contactUsForm.reset();
                this.failureMessage = '';
              } else {
                this.submitting = false;
                this.failureMessage = res.error.message;
                this.successMessage = '';
              }
            })
          } else {
            this.submitting = false;
            this.failureMessage = res.error.message;
            this.successMessage = ''
          }
        })

      } else {
        (await this.commonService.registerServicePartner(data)).subscribe((res: any) => {
          if (res.status === 'Success') {
            this.submitting = false;
            this.successMessage = 'Submission successful! Thank you for your interest. We will get back to you soon. In the meantime, feel free to check out our FAQ section or follow us on social media for updates and tips.';
            this.contactUsForm.reset();
            this.failureMessage = '';
          } else {
            this.submitting = false;
            this.failureMessage = res.error.message;
            this.successMessage = '';
          }
        })
      }

    } else {
      this.submitting = false;
      this.failureMessage = '';
      this.successMessage = ''
      // If the form is invalid, mark all fields as touched to trigger validation messages
      this.contactUsForm.markAllAsTouched();
    }
  }
}
