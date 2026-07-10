import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormArray, FormControl, AsyncValidatorFn } from '@angular/forms';
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
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]], studentEmail: ['',[Validators.required, Validators.email],
      [this.simulateEmailCheck]], courseId: [ '', [Validators.required, this.noCourseCode]], preferredSemester: ['',
      Validators.required], agreeToTerms: [ false, Validators.requiredTrue], additionalCourses: this.fb.array([]) });
  }

  onSubmit() {
    console.log('Form Value:', this.enrollForm.value);
    console.log('Raw Value:', this.enrollForm.getRawValue());
    console.log('Is Form Valid:', this.enrollForm.valid);
  }

  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null;
    }
    return value.startsWith('XX')
      ? { noCourseCode: true }
      : null;
  }

  simulateEmailCheck: AsyncValidatorFn = ( control: AbstractControl ) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      setTimeout(() => {
        if (control.value?.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  };

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }
  addCourse(): void {
    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );
  }
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }
}