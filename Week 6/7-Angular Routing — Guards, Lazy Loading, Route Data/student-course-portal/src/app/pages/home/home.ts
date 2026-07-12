import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private courseService: CourseService){}

  CoursesAvailable: number = 0;
  Enrolled:number = 3;
  GPA:number = 3.8;

  portalName: string = "Student Course Portal";


  searchterm = '';

  ngOnInit(){
    this.CoursesAvailable = this.courseService.getCourses().length;
    console.log("Homecomponent initialized - course loaded");
  }

  ngOnDestroy(){
    console.log("Homecomponent destroyed");
  }
}
