import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard, CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {

  courses = [
    {id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3},
    {id: 2, name: 'React Fundamentals', code: 'REACT201', credits: 4},
    {id: 3, name: 'Vue.js Essentials', code: 'VUE301', credits: 3},
    {id: 4, name: 'Node.js for Beginners', code: 'NODE401', credits: 4},
    {id: 5, name: 'Python for Data Science', code: 'PYDS501', credits: 3}
  ];

  selectedCourseId: number | null = null;
  onEnroll(courseId: number) {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;
  }

}
