import { TestBed } from '@angular/core/testing';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the city', () => {
    const city = 'New York';

    // Set the city
    service.setCity(city);

    // Get the city and check if it matches the expected value
    service.getCity().subscribe((result) => {
      expect(result).toEqual(city);
    });
  });
});
