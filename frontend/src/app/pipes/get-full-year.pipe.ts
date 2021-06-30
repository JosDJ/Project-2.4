import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFullYear'
})
export class GetFullYearPipe implements PipeTransform {

  transform(value: string | undefined, args?: any): number {
    if (!value) {
      return 0;
    }

    return new Date(value).getFullYear();
  }
}
