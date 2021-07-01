import { Pipe, PipeTransform } from '@angular/core';
import { CurrentSong } from '../interfaces/current-song';
import { Song } from '../interfaces/song';

@Pipe({
  name: 'isFirstPlaying'
})
export class IsFirstPlayingPipe implements PipeTransform {

  transform(queue: Song[], song: Song): boolean {
    const index = queue.indexOf(song);

    if (index == 0) {
      return true;
    }

    return false;
  }

}
