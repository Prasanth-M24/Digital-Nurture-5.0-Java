import { Component, inject } from '@angular/core';
import { Enrollment } from '../../services/enrollment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  private enrollment = inject(Enrollment);

  enrolledCourses$ = this.enrollment.getEnrolledCourses();
}
