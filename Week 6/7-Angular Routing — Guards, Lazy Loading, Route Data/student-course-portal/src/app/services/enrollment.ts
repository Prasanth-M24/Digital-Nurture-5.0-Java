import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root',
})
export class Enrollment {
  constructor(private courseService: CourseService) {}
  private enrolledCoursesId: number[] = [];
  
  enroll(courseId: number): void {
    if (!this.enrolledCoursesId.includes(courseId)) {
      this.enrolledCoursesId.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    const index = this.enrolledCoursesId.indexOf(courseId);
    if (index > -1) {
      this.enrolledCoursesId.splice(index, 1);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCoursesId.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCoursesId.map(id => this.courseService.getCourseById(id)).filter((v): v is Course => !!v);
  }
}
