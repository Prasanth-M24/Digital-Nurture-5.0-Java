import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentform } from '../features/enrollment/reactive-enrollmentform/reactive-enrollmentform';

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentform> =
(component) => {

  if (component.enrollForm.dirty) {

    return window.confirm(
      'You have unsaved changes. Leave?'
    );

  }

  return true;
};