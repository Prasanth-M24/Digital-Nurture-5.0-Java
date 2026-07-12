import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

const COURSES_API_URL = 'http://localhost:3000/courses';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(COURSES_API_URL).pipe(
      map(courses => courses.filter(course => course.credits > 0)),
      
      tap(courses => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${COURSES_API_URL}/${courseId}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(COURSES_API_URL, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${COURSES_API_URL}/${course.id}`, course);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${COURSES_API_URL}/${courseId}`);
  }
}