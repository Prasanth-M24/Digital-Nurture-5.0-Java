import { Component, OnInit } from '@angular/core';
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
  standalone: true,
  imports: [CourseCard, CommonModule, Highlight, CourseSummaryWidget, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})

export class CourseList implements OnInit {

  courses: Course[] = [];
  errorMessage = '';
  operationMessage = '';

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {}

  selectedCourseId: number | null = null;
  onEnroll(courseId: number) {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;
  }

  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadCourses();
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';

  }

  private loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourses().subscribe({
      next: courses => this.courses = courses,
      error: err => {
        this.errorMessage = err.message;
        queueMicrotask(() => this.isLoading = false);
      },
      complete: () => queueMicrotask(() => this.isLoading = false)
    });
  }

  trackByCourseId(i: number, course: Course) {
    return course.id;
  }

  addCourse() {
    const newCourse = {
      name: 'New Course',
      code: 'NEW101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };

    this.courseService.createCourse(newCourse).subscribe({
      next: () => {
        this.operationMessage = 'Course created successfully.';
        this.loadCourses();
      },
      error: err => this.errorMessage = err.message,
    });
  }

  updateCourse(course: Course) {
    const updatedCourse: Course = {
      ...course,
      name: `${course.name} (Updated)`,
    };

    this.courseService.updateCourse(updatedCourse).subscribe({
      next: () => {
        this.operationMessage = `Course ${course.id} updated successfully.`;
        this.loadCourses();
      },
      error: err => this.errorMessage = err.message,
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        this.operationMessage = `Course ${courseId} deleted successfully.`;
        this.loadCourses();
      },
      error: err => this.errorMessage = err.message,
    });
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
