import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';


@Component({
  selector: 'app-course-list',
  imports: [CourseCard, CommonModule, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})

export class CourseList implements OnInit {


  courses = [
    {id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, 'gradeStatus': 'passed', enrolled: true},
    {id: 2, name: 'React Fundamentals', code: 'REACT201', credits: 4, 'gradeStatus': 'pending', enrolled: false},
    {id: 3, name: 'Vue.js Essentials', code: 'VUE301', credits: 5, 'gradeStatus': 'failed', enrolled: false},
    {id: 4, name: 'Node.js for Beginners', code: 'NODE401', credits: 4, 'gradeStatus': 'pending', enrolled: false},
    {id: 5, name: 'Python for Data Science', code: 'PYDS501', credits: 3, 'gradeStatus': 'passed', enrolled: true}
  ];

  selectedCourseId: number | null = null;
  onEnroll(courseId: number) {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;
  }

  isLoading: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
  setTimeout(() => {
    this.isLoading = false;
    this.cdr.detectChanges();
  }, 1500);
}

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

}
