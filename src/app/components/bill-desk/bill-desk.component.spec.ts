import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDeskComponent } from './bill-desk.component';

describe('BillDeskComponent', () => {
  let component: BillDeskComponent;
  let fixture: ComponentFixture<BillDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDeskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
