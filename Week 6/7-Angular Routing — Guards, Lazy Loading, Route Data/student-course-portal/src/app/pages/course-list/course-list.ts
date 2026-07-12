import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseSummaryWidget } from '../../course-summary-widget/course-summary-widget';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-course-list',
  imports: [CourseCard, CommonModule, Highlight, CourseSummaryWidget, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})

export class CourseList implements OnInit {

  courses: Course[] = [];
  constructor(private cdr: ChangeDetectorRef, private courseService: CourseService, private router: Router, private route: ActivatedRoute) {}

  selectedCourseId: number | null = null;
  onEnroll(courseId: number) {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;
  }

  isLoading: boolean = true;

  ngOnInit(): void {

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);

    this.courses = this.courseService.getCourses();
    console.log("This is from the course list component");
    console.log(this.courses);

    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';

  }

  trackByCourseId(i: number, course: Course) {
    return course.id;
  }

  addCourse() {
    const newCourse: Course = {id: this.courses.length + 1, name: 'New Course', code: 'NEW101', credits: 3, gradeStatus: 'pending', enrolled: false};
    this.courseService.addCourse(newCourse);
    this.courses = this.courseService.getCourses();
  }

  onCourseClick(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  viewCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  searchTerm: string = '';
  searchCourse() {
    this.router.navigate(
      ['courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );
  }
}
