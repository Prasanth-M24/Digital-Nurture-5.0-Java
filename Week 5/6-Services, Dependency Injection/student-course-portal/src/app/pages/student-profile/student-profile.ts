import { Component } from '@angular/core';
import { Enrollment } from '../../services/enrollment';
import { CourseService } from '../../services/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  constructor(private enrollment: Enrollment, private courseService: CourseService) {}
  get enrolledCourses() {
    return this.courseService.getCourses().filter(course => this.enrollment.isEnrolled(course.id));
  }
}
