import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [
    {id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, 'gradeStatus': 'passed', enrolled: true},
    {id: 2, name: 'React Fundamentals', code: 'REACT201', credits: 4, 'gradeStatus': 'pending', enrolled: false},
    {id: 3, name: 'Vue.js Essentials', code: 'VUE301', credits: 5, 'gradeStatus': 'failed', enrolled: false},
    {id: 4, name: 'Node.js for Beginners', code: 'NODE401', credits: 4, 'gradeStatus': 'pending', enrolled: false},
    {id: 5, name: 'Python for Data Science', code: 'PYDS501', credits: 3, 'gradeStatus': 'passed', enrolled: true}
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(courseId: number): Course | undefined {
    return this.courses.find(course => course.id === courseId);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}