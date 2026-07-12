import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget {
  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef) {}

  courses: Course[] = [];

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    console.log("This is from the course summary widget component");
    console.log(this.courses);
  }

  trackByCourseId(i: number, course: Course) {
    return course.id;
  }
}
