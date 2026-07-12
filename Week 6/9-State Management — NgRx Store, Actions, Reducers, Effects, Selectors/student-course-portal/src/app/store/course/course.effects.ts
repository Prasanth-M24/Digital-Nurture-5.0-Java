import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../../services/course';
import { setEnrolledCourses } from '../enrollment/enrollment.actions';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

@Injectable()
export class CourseEffects {
  private readonly actions$ = inject(Actions);
  private readonly courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error: Error) => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );

  syncEnrolledCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCoursesSuccess),
      map(({ courses }) =>
        setEnrolledCourses({
          courseIds: courses.filter((course) => course.enrolled).map((course) => course.id)
        })
      )
    )
  );
}
