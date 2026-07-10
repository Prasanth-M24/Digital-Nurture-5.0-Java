import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges{
  @Input() course: {id:number, name:string, code:string, credits:number} = {id:0, name:'', code:'', credits:0};
  

  @Output() enrollRequested = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
     if(changes['course']){
      console.log('Course Changed');
      console.log('Previous Value:', changes['course'].previousValue);
      console.log('Current Value:', changes['course'].currentValue);  
     }
  }

  isPortalActive = true;
  // message = '';
  // onEnrollClick(){
  //   return this.message = "Enrollment Opened!";
  // }
  
}
