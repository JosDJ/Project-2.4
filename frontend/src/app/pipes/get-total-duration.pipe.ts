import { Pipe, PipeTransform } from '@angular/core';
import { Song } from 'src/app/interfaces/song';

@Pipe({
  name: 'getTotalDuration'
})
export class GetTotalDurationPipe implements PipeTransform {

  transform(value: Song[] | undefined, args?: any): number {
    if (value) {
      return this.getTotalDuration(value);
    }

    return 0;
  }

  getTotalDuration(songs: Song[]): number {
    let total = 0;

    songs.forEach(song => {
      if (song.file) {
        if (song.file.duration) {
          total += song.file.duration;
        }
      }
    });

    return total;
  }

}
