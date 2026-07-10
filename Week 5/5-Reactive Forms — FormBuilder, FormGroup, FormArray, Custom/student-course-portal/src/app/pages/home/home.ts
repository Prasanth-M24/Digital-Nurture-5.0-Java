import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  CoursesAvailable: number = 12;
  Enrolled:number = 3;
  GPA:number = 3.8;

  portalName: string = "Student Course Portal";


  searchterm = '';

  ngOnInit(){
    console.log("Homecomponent initialized - course loaded");
  }

  ngOnDestroy(){
    console.log("Homecomponent destroyed");
  }
}
