import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  transform(value: number | undefined, args?: any): number {
    if (value) {
      return Math.floor(value);
    }

    return 0;
  }

}
