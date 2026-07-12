import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveEnrollmentform } from './reactive-enrollmentform';

describe('ReactiveEnrollmentform', () => {
  let component: ReactiveEnrollmentform;
  let fixture: ComponentFixture<ReactiveEnrollmentform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveEnrollmentform],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveEnrollmentform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
