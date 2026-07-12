import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../../../services/course';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  constructor(private courseService: CourseService) {}

  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  submitted = false;
  errorMessage = '';
  successMessage = '';

  onSubmit(form: NgForm) {
    console.log(` Form value: ${JSON.stringify(form.value)}`);
    console.log(` Is form valid: ${form.valid}`);

    const course = {
      name: this.studentName.trim(),
      code: `ENR-${this.courseId ?? Date.now()}`,
      credits: this.preferredSemester === 'Odd' ? 3 : 4,
      gradeStatus: 'pending' as const,
      enrolled: this.agreeToTerms,
    };

    this.courseService.createCourse(course).subscribe({
      next: createdCourse => {
        console.log('Created course:', createdCourse);
        this.successMessage = 'Enrollment request submitted successfully and persisted as a course.';
        this.errorMessage = '';
        this.submitted = true;
      },
      error: error => {
        this.errorMessage = error.message;
        this.successMessage = '';
      },
    });
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
