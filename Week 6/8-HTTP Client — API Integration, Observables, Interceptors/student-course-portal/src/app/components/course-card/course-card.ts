import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Router } from '@angular/router';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Enrollment } from '../../services/enrollment';

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
export class CourseCard implements OnChanges {
  private readonly enrollment = inject(Enrollment);

  @Input() course!: Course;

  @Input() isPortalActive = true;

  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolled = false;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.isEnrolled = this.enrollment.isEnrolled(this.course.id) || !!this.course.enrolled;
    }
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick() {
    this.enrollment.enroll(this.course.id);
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course.id);
    console.log('Enrolled in', this.course.name);
  }

  onUnenrollClick() {
    this.enrollment.unenroll(this.course.id);
    this.isEnrolled = false;
    console.log('Unenrolled from', this.course.name);
  }

  viewCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  get cardClasses() {
    return {
      enrolled: this.isEnrolled,
      expanded: this.isExpanded
    };
  }
}
