import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseSummaryWidget } from '../../course-summary-widget/course-summary-widget';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, CommonModule, Highlight, CourseSummaryWidget, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})

export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  errorMessage$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  operationMessage = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.errorMessage$ = this.store.select(selectCoursesError);
    this.isLoading$ = this.store.select(selectCoursesLoading);
  }

  selectedCourseId: number | null = null;
  onEnroll(courseId: number) {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
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
        this.store.dispatch(loadCourses());
      },
      error: (err) => this.operationMessage = err.message,
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
        this.store.dispatch(loadCourses());
      },
      error: (err) => this.operationMessage = err.message,
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        this.operationMessage = `Course ${courseId} deleted successfully.`;
        this.store.dispatch(loadCourses());
      },
      error: (err) => this.operationMessage = err.message,
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
