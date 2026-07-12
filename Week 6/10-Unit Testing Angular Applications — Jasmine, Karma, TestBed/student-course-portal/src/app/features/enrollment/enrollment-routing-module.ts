import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnrollmentForm } from './enrollment-form/enrollment-form';
import { ReactiveEnrollmentform } from './reactive-enrollmentform/reactive-enrollmentform';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentForm
  },
  {
    path: 'reactive',
    component: ReactiveEnrollmentform
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule {}