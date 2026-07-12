import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CourseDetailComponent } from './course-detail';
import { CourseService } from '../../services/course';
import { Enrollment } from '../../services/enrollment';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
        {
          provide: CourseService,
          useValue: {
            getCourseById: () => of({
              id: 1,
              name: 'Data Structures',
              code: 'CS101',
              credits: 4,
              gradeStatus: 'passed',
              enrolled: false,
            }),
          },
        },
        {
          provide: Enrollment,
          useValue: {
            getStudentsByCourse: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
