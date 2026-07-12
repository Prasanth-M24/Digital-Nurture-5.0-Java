import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from './course';

const COURSES_API_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root',
})
export class Enrollment {
  private readonly enrolledCoursesIdSubject = new BehaviorSubject<number[]>([]);
  private readonly unenrolledCoursesIdSubject = new BehaviorSubject<number[]>([]);

  constructor(private courseService: CourseService, private http: HttpClient) {}
  
  enroll(courseId: number): void {
    const enrolledCoursesId = this.enrolledCoursesIdSubject.value;
    const unenrolledCoursesId = this.unenrolledCoursesIdSubject.value.filter(id => id !== courseId);

    if (!enrolledCoursesId.includes(courseId)) {
      this.enrolledCoursesIdSubject.next([...enrolledCoursesId, courseId]);
    }

    this.unenrolledCoursesIdSubject.next(unenrolledCoursesId);
  }

  unenroll(courseId: number): void {
    const enrolledCoursesId = this.enrolledCoursesIdSubject.value.filter(id => id !== courseId);
    const unenrolledCoursesId = this.unenrolledCoursesIdSubject.value;

    this.enrolledCoursesIdSubject.next(enrolledCoursesId);

    if (!unenrolledCoursesId.includes(courseId)) {
      this.unenrolledCoursesIdSubject.next([...unenrolledCoursesId, courseId]);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCoursesIdSubject.value.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return combineLatest([
      this.courseService.getCourses(),
      this.enrolledCoursesIdSubject.asObservable(),
      this.unenrolledCoursesIdSubject.asObservable()
    ]).pipe(
      map(([courses, enrolledCoursesId, unenrolledCoursesId]) =>
        courses.filter(course =>
          (course.enrolled || enrolledCoursesId.includes(course.id)) &&
          !unenrolledCoursesId.includes(course.id)
        )
      )
    );
  }

  getStudentsByCourse(courseId: number): Observable<string[]> {
    return this.http.get<Course>(`${COURSES_API_URL}/${courseId}`).pipe(
      map(course => course.students ?? [])
    );
  }
}
