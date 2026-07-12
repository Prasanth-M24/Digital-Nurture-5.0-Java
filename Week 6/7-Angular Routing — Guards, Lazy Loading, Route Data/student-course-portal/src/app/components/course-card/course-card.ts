import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Router } from '@angular/router';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

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

  @Input() course!: Course;

  @Input() isPortalActive = true;

  isExpanded = false;
  isEnrolled = false;

  constructor(private router: Router) {}

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick() {
    this.isEnrolled = true;
    console.log('Enrolled in', this.course.name);
  }

  onUnenrollClick() {
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