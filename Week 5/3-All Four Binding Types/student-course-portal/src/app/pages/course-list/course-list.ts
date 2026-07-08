import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  // courses = [
  //   { id: 1, name: 'Angular Basics', duration: '4 weeks' },
  //   { id: 2, name: 'React Fundamentals', duration: '6 weeks' },
  //   { id: 3, name: 'Vue.js Essentials', duration: '5 weeks' },
  //   { id: 4, name: 'Node.js for Beginners', duration: '3 weeks' },
  // ];

  course1 = { id: 1, name: 'Angular Basics', duration: '4 weeks' };
  course2 = { id: 2, name: 'React Fundamentals', duration: '6 weeks' };
  course3 = { id: 3, name: 'Vue.js Essentials', duration: '5 weeks' };
  course4 = { id: 4, name: 'Node.js for Beginners', duration: '3 weeks' };
}
