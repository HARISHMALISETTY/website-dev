import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bServiceComponent } from './b2b-service.component';

describe('B2bServiceComponent', () => {
  let component: B2bServiceComponent;
  let fixture: ComponentFixture<B2bServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B2bServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
