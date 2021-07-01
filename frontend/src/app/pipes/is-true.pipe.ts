import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTrue'
})
export class IsTruePipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): boolean|null {
    if (value) {
      return true;
    }

    return null;
  }

}
