import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges{
  @Input() course: any;

  ngOnChanges(changes: SimpleChanges): void {
     if(changes['course']){
      console.log('Course Changed');
      console.log('Previous Value:', changes['course'].previousValue);
      console.log('Current Value:', changes['course'].currentValue);  
     }
  }
  
}
