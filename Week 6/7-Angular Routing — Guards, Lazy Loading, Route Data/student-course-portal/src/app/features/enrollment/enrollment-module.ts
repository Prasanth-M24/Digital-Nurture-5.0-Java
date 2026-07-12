import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing-module';

import { EnrollmentForm } from './enrollment-form/enrollment-form';
import { ReactiveEnrollmentform } from './reactive-enrollmentform/reactive-enrollmentform';

@NgModule({
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    EnrollmentForm,
    ReactiveEnrollmentform
  ]
})
export class EnrollmentModule {}