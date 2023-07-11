import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citySubject = new BehaviorSubject<string>('default');

  constructor() { }

  setCity(city: string) {
    this.citySubject.next(city);
  }

  getCity() {
    return this.citySubject.asObservable();
  }
}
