import { Pipe, PipeTransform } from '@angular/core';
import { Song } from 'src/app/interfaces/song';

@Pipe({
  name: 'getTotalDuration'
})
export class GetTotalDurationPipe implements PipeTransform {

  transform(value: Song[], args?: any): number {
    return this.getTotalDuration(value);
  }

  getTotalDuration(songs: Song[]): number {
    let total = 0;

    songs.forEach(song => {
      if (song.file.duration) {
        total += song.file.duration;
      }
    });

    return total;
  }

}
