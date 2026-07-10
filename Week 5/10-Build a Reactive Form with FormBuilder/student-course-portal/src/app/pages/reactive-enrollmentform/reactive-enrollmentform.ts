import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollmentform',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollmentform.html',
  styleUrl: './reactive-enrollmentform.css',
})
export class ReactiveEnrollmentform implements OnInit {

  enrollForm!: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({ studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email]], courseId: [null, Validators.required],
      preferredSemester: ['', Validators.required], agreeToTerms: [false, Validators.requiredTrue] }
    );
  }

  onSubmit() {
    console.log(` Form value: ${JSON.stringify(this.enrollForm.value)}`);
    console.log(` Is form valid: ${this.enrollForm.valid}`);
  }
}

