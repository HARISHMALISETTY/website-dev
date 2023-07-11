import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CityService } from 'src/app/services/city/city.service';
import { CommonService } from 'src/app/services/common/common.service';
import { LocationService } from 'src/app/services/location/location.service';



import SwiperCore, { Navigation, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { BillDeskComponent } from '../bill-desk/bill-desk.component';
import { NgOtpInputComponent } from 'ng-otp-input';

SwiperCore.use([Virtual, Navigation]);
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})

export class BookAppointmentComponent implements OnInit, OnDestroy {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('billDesk') billDesk?: BillDeskComponent;
  @ViewChild('ngOtpInput') ngOtpInput?: NgOtpInputComponent;

  center: google.maps.LatLngLiteral = { lat: 17.428250168737826, lng: 78.4551260126551 };
  otp: any;
  zoom = 18;
  markerOptions: google.maps.MarkerOptions = { draggable: true, clickable: true };
  otpInputConfig = {
    length: 6, allowNumbersOnly: true, inputStyles: {
      height: '25px',
      width: '25px',
      fontSize: '1rem'
    },
    containerStyles: {
      margin: '5px'
    }
  }
  otpSent = false;
  timerId: any;
  resendOtpTimeLeft = 30;
  otpVerified = false;
  submitted = false;

  serviceSelected = 0;
  servicesList: any[] = [];
  errorMessage = "";
  successMessage = "";

  breakpoints = {
    '0': {
      slidesPerView: 4,
      spaceBetween: 20
    },
    '768': {
      slidesPerView: 4,
      spaceBetween: 20
    },
    '1024': {
      slidesPerView: 5,
      spaceBetween: 20
    }
  };
  formattedAddress = '';
  isSlideBeginnging: any;
  isSlideEnd: any;
  scrHeight: any;
  scrWidth: any;
  mobileVerificationForm: FormGroup = new FormGroup({});
  selectedServiceName: any;
  selectedServiceObj: any;
  sessionId: any;
  defaultAddresses: any[] = [];
  selectedAddress: any = {};
  addressCategories: any;
  addressForm: any;
  appointmentForm: any;
  categoryId: any = '';
  disableAddressCategory: boolean = false;
  appointmentDate: any = moment(new Date()).add('days', 1).format('DD-MMM-yyyy');
  screenWidth: any;
  subCategories: any[] = [];
  selectedSubCategory: any;
  minDate = moment(new Date()).add('days', 1);
  city: any;
  isAppointmentBooked = false;
  localityName = '';

  constructor(private locationService: LocationService,
    private authService: AuthService,
    private commonService: CommonService,
    private formBuilder: FormBuilder, private cityService: CityService) {

    this.cityService.getCity().subscribe(city => {
      this.city = city;
    });

    this.locationService.getPosition().then((position) => {
      this.center = position;
    }).catch((err: GeolocationPositionError) => {
      if (err.code === 1) {
        this.errorMessage = 'Location permission is required to book appointment.'
      } else {
        this.errorMessage = 'An error occurred while trying to determine your location. Please try again.'
      }
    });
  }

  ngOnInit() {
    this.mobileVerificationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });

    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  updateSlideStatus() {
    this.isSlideBeginnging = this.swiper?.swiperRef.isBeginning;
    this.isSlideEnd = this.swiper?.swiperRef.isEnd;
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev(100);
    this.updateSlideStatus();
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext(100);
    this.updateSlideStatus();
  }


  public async handleAddressChange(address: Address) {
    this.disableAddressCategory = false;
    this.categoryId = '';
    const location = address.geometry.location;
    this.formattedAddress = address.formatted_address;

    const isRegisteredAddress = this.isAddressRegistered(address.formatted_address);
    if (isRegisteredAddress) {
      this.categoryId = isRegisteredAddress.categories[0].key;
      this.disableAddressCategory = true;
    }

    this.center = {
      lat: location.lat(),
      lng: location.lng(),
    };
    const localityObj = address.address_components.find((obj: any) => obj.types.includes('locality'));

    this.localityName = localityObj ? localityObj.long_name : '';
    await this.checkLocalityServiceable(this.localityName, this.center.lat, this.center.lng);
  }

  async checkLocalityServiceable(localityName: any, lat: any, lng: any) {
    if (localityName) {
      return new Promise(async (resolve, reject) => {
        (await this.commonService.checkServiceArea(localityName, lat, lng))
          .subscribe((res: any) => {
            if (res.status !== 'SUCCESS') {
              reject(false);
              this.errorMessage = "Sorry, we do not currently offer services in your selected location.";
            } else {
              resolve(true);
              this.errorMessage = '';
            }
          })
      });
    } else {
      this.errorMessage = "Please choose an appropriate neighborhood or provide a valid address."
      return;
    }
  }

  setMapCenter(event: any) {
    this.errorMessage = '';
    const addressId = event.option.value;
    this.selectedAddress = this.defaultAddresses.find((address: any) => address.addressId === addressId);
    this.formattedAddress = this.selectedAddress.formattedAddress;
    this.categoryId = this.selectedAddress.categories[0].key;
    this.center = {
      lat: Number(this.selectedAddress.latitude),
      lng: Number(this.selectedAddress.longitude)
    };

    this.disableAddressCategory = true;

  }

  handleDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.errorMessage = '';
    this.appointmentDate = moment(event.value?.toString()).format('DD-MMM-yyyy');
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    this.disableAddressCategory = false;
    if (event.latLng) {
      const { lat, lng } = event.latLng.toJSON();
      this.center = {
        lat, lng
      }
      this.getLocationByLatLong(lat, lng);
    }
  }

  getLocationByLatLong(latitude: any, longitude: any) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({
      location: latlng
    }, async (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results) {
          this.formattedAddress = results[0].formatted_address;
          const localityObj = results[0].address_components.find((obj: any) => obj.types.includes('locality'));

          this.localityName = localityObj ? localityObj.long_name : '';
          await this.checkLocalityServiceable(this.localityName, this.center.lat, this.center.lng);
        }
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }


  onOtpChange(event: any) {
    this.otp = event
  }


  startOTPTimer() {
    this.resendOtpTimeLeft = 30;
    const self = this;
    const countdown = () => {
      if (self.resendOtpTimeLeft == 0) {
        clearTimeout(this.timerId);
      } else {
        self.resendOtpTimeLeft--;
      }
    }
    this.timerId = setInterval(countdown, 1000);
  }


  async sendOTP() {
    this.mobileVerificationForm.controls['name'].enable();
    this.mobileVerificationForm.controls['mobile'].enable();
    if (this.mobileVerificationForm.valid) {
      const data = {
        name: this.mobileVerificationForm.value.name,
        mobileNo: this.mobileVerificationForm.value.mobile,
        city: this.city
      };
      (await this.authService.sendOtp(data)).subscribe((response: any) => {
        if (response.status === 'SUCCESS') {
          this.otpSent = true;
          this.mobileVerificationForm.controls['mobile'].disable();
          this.mobileVerificationForm.controls['name'].disable();
          this.ngOtpInput?.setValue('');
          this.startOTPTimer();
          this.errorMessage = '';
          this.successMessage = response.data.message;
        } else {
          this.errorMessage = response.error.message
        }
      });
    } else {
      if (this.mobileVerificationForm.get('name')?.invalid) {
        this.errorMessage = 'Name is not valid';
        return;
      }
      this.errorMessage = 'Mobile Number is not valid'
    }
  }

  async getAddressCategories() {
    (await this.commonService.getAddressCategories()).subscribe((res: any) => {
      if (res.status === 'SUCCESS') {
        this.addressCategories = res.data.categories;
      } else {
        this.errorMessage = res.error.message;
      }
    })
  }


  async verifyOTP() {
    if (this.otp?.length === 6) {
      const data = {
        verificationCode: this.otp,
        mobileOrEmail: this.mobileVerificationForm.value.mobile
      };
      (await this.authService.verifyOTP(data)).subscribe((response: any) => {
        if (response.status === 'SUCCESS') {
          this.otpVerified = true;
          this.errorMessage = '';
          if (response.data?.addresses?.length > 0) {
            this.defaultAddresses = response.data.addresses.filter((address: any) => !address.invalid);
            const defaultAddress = this.defaultAddresses.find((address: any) => address.defaultAddress === 'YES');
            this.formattedAddress = defaultAddress.formattedAddress
            this.selectedAddress = defaultAddress;
            this.categoryId = defaultAddress.categories[0].key;
            this.localityName = defaultAddress.city;
            this.disableAddressCategory = true;
            this.center = {
              lat: Number(defaultAddress.latitude),
              lng: Number(defaultAddress.longitude)
            };
          }
          this.getAddressCategories();
          // this.getServicesCategories();
        } else {
          this.errorMessage = response.error.message;
        }
        this.successMessage = '';
      });
    } else {
      this.errorMessage = 'Verification code is incorrect'
    }
  }


  async submit() {
    await this.checkLocalityServiceable(this.localityName, this.center.lat, this.center.lng).then(async (isServiceable) => {
      if (this.errorMessage) {
        return;
      }
      if (!this.formattedAddress) {
        this.errorMessage = 'Please select a valid address.';
      }
      else if (!this.categoryId) {
        this.errorMessage = 'please select a valid address type.'
      }
      else if (!this.appointmentDate) {
        this.errorMessage = 'please select an appointment date.'
      }
      else {
        await this.getServicesCategories(this.localityName);
        this.submitted = true;
      }
    });

  }

  isAddressRegistered(formattedAddress: string) {
    return this.defaultAddresses.find((address: any) => address.formattedAddress === formattedAddress);
  }

  async bookAppointment() {
    const items = [
      {
        areaPricingId: this.selectedSubCategory.areaPricingId,
        categoryId: this.selectedSubCategory.productId,
        categoryName: this.selectedSubCategory.productName,
        quantity: 1,
        pricePerUnit: this.selectedSubCategory.price,
        image: this.selectedSubCategory.image
      }
    ];

    let data: any = {};


    if (this.defaultAddresses.length === 0 || !this.isAddressRegistered(this.formattedAddress)) {
      data = {
        mobile: this.mobileVerificationForm.value.mobile,
        addressType: this.addressCategories.find((addressCategory: any) => addressCategory.consumerCategoryId === this.categoryId).name,
        formattedAddress: this.formattedAddress,
        latitude: this.center.lat,
        longitude: this.center.lng,
        preferredDate: this.appointmentDate,
        addressId: null,
        items: items
      };
    } else {
      data = {
        mobile: this.mobileVerificationForm.value.mobile,
        addressType: this.addressCategories.find((addressCategory: any) => addressCategory.consumerCategoryId === this.categoryId).name,
        formattedAddress: this.formattedAddress,
        latitude: this.center.lat,
        longitude: this.center.lng,
        preferredDate: this.appointmentDate,
        addressId: this.selectedAddress.addressId,
        items: items,
      }
    }

    (await this.commonService.bookAppointment(data)).subscribe(async (response: any) => {
      if (response.status === 'SUCCESS') {
        this.successMessage = `Your appointment is confirmed. Our service partner shall arrive at your address on ${this.appointmentDate}`;
        this.errorMessage = '';
        this.otpSent = false;
        this.otpVerified = false;
        this.submitted = false;
        this.isAppointmentBooked = true;
        (await this.commonService.getPrePayments()).subscribe(async (res: any) => {
          if (res.status === 'SUCCESS') {
            if (res?.data?.enablePrePayments) {
              this.billDesk?.createOrder(response?.data?.sell?.confirmationId);
            } else {
              this.successMessage = `Your appointment is confirmed. Our service partner shall arrive at your address on ${this.appointmentDate}.\n Please make the payment after the service professional has completed the service.`;
            }
          } else {
            this.errorMessage = response.error.message;
          }
        });
        this.mobileVerificationForm.controls['mobile'].enable();
      } else {
        this.errorMessage = response.error.message;
        this.successMessage = '';
      }
    });
  }

  selectServiceCategory(id: any) {
    if (this.serviceSelected !== id) {
      this.serviceSelected = id;
      this.selectedServiceName = this.servicesList[id].name;
      this.getSubCategories();
      // this.selectedSubCategory = undefined;
    }
  }

  selectSubService(obj: object) {
    this.selectedSubCategory = obj;
  }


  async getServicesCategories(cityName: string) {
    (await this.commonService.getServiceCategories(cityName))
      .subscribe(async (response: any) => {
        if (response?.status === 'SUCCESS') {
          this.servicesList = response.data.uniqueProductCategories;
          if (this.servicesList.length > 0) {
            this.serviceSelected = 0;
            this.selectedServiceObj = this.servicesList[0];
            this.selectedServiceName = this.servicesList[0].productCategoryName;
            this.getSubCategories();
          }
          this.errorMessage = '';
        } else {
          if (response.error.message === 'Area not found') {
            this.errorMessage = "Sorry, we do not currently offer services in your selected location.";
          }
          else {
            this.errorMessage = response.error.message;
          }
        }
      })

  }

  async getSubCategories() {
    // const data = {
    //   location: { latitude: this.center.lat, longitude: this.center.lng },
    //   serviceId: this.servicesList[this.serviceSelected].id,
    //   consumerCategoryId: '56f004349950b5754387ff70',
    //   // consumerId: '637b20433308fd45e0f68ebc',
    //   city: this.localityName
    // };
    const data = {
      location: { latitude: this.center.lat, longitude: this.center.lng },
      serviceId: this.servicesList[this.serviceSelected].id,
      consumerCategoryId: this.categoryId,
      consumerId: this.defaultAddresses[0]?.userId || '',
      city: this.localityName
    };
    (await this.commonService.getSubServiceCategories(data)).subscribe(async (res: any) => {
      if (res?.status === 'SUCCESS') {
        this.subCategories = res.data.areaPricingList;
        if (this.subCategories.length > 0) {
          this.selectedSubCategory = this.subCategories[0];
        }
        this.errorMessage = '';
      } else {
        this.subCategories = [];
        this.errorMessage = res.error.message;
      }
    }, async () => { });
  }

  goBack() {
    this.submitted = false;
  }
}




