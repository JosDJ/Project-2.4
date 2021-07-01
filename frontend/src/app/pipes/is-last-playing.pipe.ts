import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../interfaces/song';

@Pipe({
  name: 'isLastPlaying'
})
export class IsLastPlayingPipe implements PipeTransform {

  transform(queue: Song[], song: Song): boolean {
    const index = queue.indexOf(song);

    if (index === queue.length - 1) {
      return true;
    }

    return false;
  }

}
