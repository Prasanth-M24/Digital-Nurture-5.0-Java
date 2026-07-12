import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { vi } from 'vitest';

import { unsavedChangesGuard } from './unsaved-changes-guard';
import { ReactiveEnrollmentform } from '../features/enrollment/reactive-enrollmentform/reactive-enrollmentform';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<ReactiveEnrollmentform> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return true when form is not dirty', () => {
    const component = { enrollForm: { dirty: false } } as ReactiveEnrollmentform;
    const result = executeGuard(
      component,
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
  });

  it('should ask for confirmation when form is dirty', () => {
    const component = { enrollForm: { dirty: true } } as ReactiveEnrollmentform;
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const result = executeGuard(
      component,
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
      {} as RouterStateSnapshot
    );

    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Leave?');
    expect(result).toBe(true);
  });
});
