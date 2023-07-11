import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentCardComponent } from './book-appointment-card.component';

describe('BookAppointmentCardComponent', () => {
  let component: BookAppointmentCardComponent;
  let fixture: ComponentFixture<BookAppointmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAppointmentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
