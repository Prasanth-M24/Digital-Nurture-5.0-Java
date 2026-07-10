import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName: string = '';
  studentEmail: string = '';
  courseId: number = 0;
  preferredSemester: string = '';
  agreeToTerms: boolean = false;


  onSubmit(form: NgForm) {
    console.log(` Form value: ${JSON.stringify(form.value)}`);
    console.log(` Is form valid: ${form.valid}`);
  }
}
