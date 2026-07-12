import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course';
import { Course } from '../models/course.model';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  courses$ = this.courseService.getCourses().pipe(
    catchError(() => of([])),
    shareReplay(1)
  );
  courseCount$ = this.courses$.pipe(map(courses => courses.length));

  ngOnInit() {
    this.courses$.subscribe({
      next: courses => {
        this.courses = courses;
        console.log("This is from the course summary widget component");
        console.log(this.courses);
      },
      error: () => {
        this.courses = [];
      }
    });
  }

  trackByCourseId(i: number, course: Course) {
    return course.id;
  }
}
