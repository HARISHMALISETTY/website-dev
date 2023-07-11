import { Component, EventEmitter, Output } from '@angular/core';
import { CityService } from 'src/app/services/city/city.service';
import { CommonService } from 'src/app/services/common/common.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() openSideMenuEvent = new EventEmitter<string>();
  userCity = 'Loading';
  serviceableCities: any = [];
  citiesData: any[] = [];
  currentUserCityName = '';

  constructor(private commonService: CommonService, private cityService: CityService, private locationService: LocationService) {
  }

  async ngOnInit() {
    Promise.all([this.getServiceableCities(), this.getCityNameByCurrentLatLong()]).then(() => {
      this.updateCityBasedOnUserPosition(this.currentUserCityName);
    })
  }

  getServiceableCities() {
    return new Promise<void>(async (resolve, reject) => {
      (await this.commonService.getAllCities()).subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.citiesData = res.data.cities;
          this.updateServiceableCities();
          resolve();
        } else {
          reject(res.error.message);
        }
      })
    });
  }

  updateServiceableCities() {
    this.citiesData.forEach((city: any) => {
      if (city.name === city.subarea) {
        this.serviceableCities.push(city.name);
      }
    });
  }

  updateCityBasedOnUserPosition(cityName: string) {
    this.userCity = '';
    this.citiesData.forEach((city: any) => {
      if (city.name === cityName || city.subarea === cityName) {
        this.userCity = city.name;
      }
    });
    this.saveUserCity();
  }

  getCityNameByCurrentLatLong() {
    return new Promise<void>(async (resolve, reject) => {
      let position;
      try {
        position = await this.locationService.getPosition();
      } catch (err) {
        this.userCity = "";
      }
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(position.lat, position.lng);

      await geocoder.geocode({
        location: latlng
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            const cityResult = results.find(result => result.types.includes("locality"));
            if (cityResult) {
              this.currentUserCityName = cityResult.address_components[0].long_name;
            }
          }
          resolve();
        } else {

          reject(results);
        }
      });
    })
  }

  isUserLocationServiceable(userLocation: string): boolean {
    // Check if the user's location is in the list of serviceable cities
    if (userLocation.length > 0) {
      if (this.serviceableCities.includes(userLocation)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  saveUserCity() {
    this.cityService.setCity(this.userCity);
  }

  openSideMenu() {
    this.openSideMenuEvent.emit();
  }

}
