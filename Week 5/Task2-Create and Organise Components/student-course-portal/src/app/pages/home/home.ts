import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  CoursesAvailable: number = 12;
  Enrolled:number = 3;
  GPA:number = 3.8;
}
