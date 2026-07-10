import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null) {
    if (value === null || value === undefined) {
      return 'No Credits';
    } else if (value === 1) {
      return '1 Credit`';
    } else {
      return `${value} Credits`;
    }
  }
}
