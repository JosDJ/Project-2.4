import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number | undefined, args?: any): string {
    if (value) {
      return this.formatTime(value);
    }

    return "";
  }

  public formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;

    return moment.utc(momentTime).format(format);
  }

}
