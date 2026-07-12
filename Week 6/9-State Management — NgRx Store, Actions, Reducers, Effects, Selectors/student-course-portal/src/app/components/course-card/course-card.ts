import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {
  private readonly store = inject(Store);

  @Input() course!: Course;

  @Input() isPortalActive = true;

  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  enrolledIds$ = this.store.select(selectEnrolledIds);

  constructor(private router: Router) {}

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick() {
    this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    this.enrollRequested.emit(this.course.id);
    console.log('Enrolled in', this.course.name);
  }

  onUnenrollClick() {
    this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    console.log('Unenrolled from', this.course.name);
  }

  viewCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  onEnrollmentToggle(isEnrolled: boolean, event: Event) {
    event.stopPropagation();

    if (isEnrolled) {
      this.onUnenrollClick();
      return;
    }

    this.onEnrollClick();
  }
}
