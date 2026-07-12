import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { Notification } from '../../components/notification/notification';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private courseService = inject(CourseService);

  CoursesAvailable: number = 0;
  courses$ = this.courseService.getCourses().pipe(
    catchError(() => of([])),
    shareReplay(1)
  );
  coursesAvailable$ = this.courses$.pipe(map(courses => courses.length));
  Enrolled:number = 3;
  GPA:number = 3.8;

  portalName: string = "Student Course Portal";


  searchterm = '';

  ngOnInit(){
    this.coursesAvailable$.subscribe({
      next: count => this.CoursesAvailable = count,
      error: () => this.CoursesAvailable = 0,
    });
    console.log("Homecomponent initialized - course loaded");
  }

  ngOnDestroy(){
    console.log("Homecomponent destroyed");
  }
}
