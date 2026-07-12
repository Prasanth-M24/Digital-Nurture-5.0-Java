import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesLayoutComponent } from './courses-layout';

describe('CoursesLayout', () => {
  let component: CoursesLayoutComponent;
  let fixture: ComponentFixture<CoursesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
