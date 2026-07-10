import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  submitted = false;

  onSubmit(form: NgForm) {
    console.log(` Form value: ${JSON.stringify(form.value)}`);
    console.log(` Is form valid: ${form.valid}`);
    this.submitted = true;
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}
