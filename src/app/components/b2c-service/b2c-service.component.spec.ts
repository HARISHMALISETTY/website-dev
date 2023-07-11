import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2cServiceComponent } from './b2c-service.component';

describe('B2cServiceComponent', () => {
  let component: B2cServiceComponent;
  let fixture: ComponentFixture<B2cServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2cServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B2cServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
