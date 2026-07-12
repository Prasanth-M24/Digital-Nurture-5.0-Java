import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { CourseSummaryWidget } from '../../course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  template: '',
})
class MockCourseSummaryWidget {}

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let routerSpy: Pick<Router, 'navigate'>;
  let store: MockStore;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false,
    },
    {
      id: 2,
      name: 'Algorithms',
      code: 'CS201',
      credits: 3,
      gradeStatus: 'pending',
      enrolled: true,
    },
  ];

  beforeEach(async () => {
    routerSpy = {
      navigate: vi.fn(),
    };

    TestBed.overrideComponent(CourseList, {
      remove: {
        imports: [CourseSummaryWidget],
      },
      add: {
        imports: [MockCourseSummaryWidget],
      },
    });

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null,
            },
            enrollment: {
              enrolledCourseIds: [],
            },
          },
        }),
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({ search: '' }),
            },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course cards from the initial mock store state', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(mockCourses.length);

    const courseNames = fixture.debugElement
      .queryAll(By.css('h2.course-name'))
      .map((element) => element.nativeElement.textContent.trim());

    expect(courseNames).toEqual(mockCourses.map((course) => course.name));
  });

  it('should show the loading indicator when the store loading state is true', async () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });
    store.refreshState();

    fixture.detectChanges();
    await fixture.whenStable();

    const loadingMessage = fixture.debugElement.query(By.css('p'));
    expect(loadingMessage.nativeElement.textContent).toContain('Loading courses...');
    expect(fixture.debugElement.queryAll(By.css('app-course-card')).length).toBe(0);
  });
});
