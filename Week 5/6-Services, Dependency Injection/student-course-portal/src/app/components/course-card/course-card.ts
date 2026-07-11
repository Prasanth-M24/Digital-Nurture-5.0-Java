import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Enrollment } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges{
  @Input() course: {id:number, name:string, code:string, credits:number, gradeStatus:string, enrolled:boolean} = {id:0, name:'', code:'', credits:0, gradeStatus:'', enrolled: false};
  
  @Output() enrollRequested = new EventEmitter<number>();

  constructor(private enrollment: Enrollment) {}

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

  isExpanded = false;
  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
  
  get cardClasses() {
    return {
      'expanded': this.isExpanded,
      'card--enrolled': this.course.enrolled,
      'card--full': this.course.credits >= 4
    };
  }

  isEnrolled: boolean = false;

  onEnrollClick() {
    if (this.enrollment.isEnrolled(this.course.id)) {
      this.isEnrolled = false;
      console.log(`Already enrolled in course: ${this.course.id}`);
    } else {
      this.enrollment.enroll(this.course.id);
      this.isEnrolled = true;
    }
  }

  onUnenrollClick() {
    if (this.enrollment.isEnrolled(this.course.id)) {
      this.enrollment.unenroll(this.course.id);
      this.isEnrolled = false;
      console.log(`Unenrolled from course: ${this.course.id}`);
    } else {
      console.log(`Not enrolled in course: ${this.course.id}`);
    }
  }
}
