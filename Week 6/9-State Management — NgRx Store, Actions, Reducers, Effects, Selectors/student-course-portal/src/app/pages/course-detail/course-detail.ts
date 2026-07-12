import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course';
import { Enrollment } from '../../services/enrollment';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private enrollmentService = inject(Enrollment);

  errorMessage = '';
  private courseId$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    shareReplay(1)
  );

  course$ = this.courseId$.pipe(
    switchMap(id => this.courseService.getCourseById(id)),
    catchError(error => {
      this.errorMessage = error.message;
      return of(undefined);
    })
  );

  enrolledStudents$ = this.courseId$.pipe(
    // switchMap cancels the previous student request when a new course id arrives.
    switchMap(courseId => this.enrollmentService.getStudentsByCourse(courseId)),
    catchError(() => of([]))
  );

  ngOnInit(): void {
  }

}