import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CourseCard } from './course-card';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let routerSpy: Pick<Router, 'navigate'>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    enrolled: false,
  };

  beforeEach(async () => {
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectEnrolledIds, value: [] }],
        }),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name from @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('h2.course-name')).nativeElement;
    expect(heading.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested with course id when enroll button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');

    fixture.debugElement.query(By.css('button.enroll-btn')).nativeElement.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should log when course input changes in ngOnChanges', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const changes: SimpleChanges = {
      course: new SimpleChange(undefined, mockCourse, true),
    };

    component.ngOnChanges(changes);

    expect(logSpy).toHaveBeenCalledWith('Course changed:', mockCourse);
  });

  it('should disable enroll button when portal is inactive', () => {
    component.course = mockCourse;
    component.isPortalActive = false;
    fixture.detectChanges();

    const enrollButton = fixture.debugElement.query(By.css('button.enroll-btn')).nativeElement;
    expect(enrollButton.disabled).toBe(true);
  });
});
