import { CurrentSong } from "./current-song";
import { Song } from "./song";

export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    currentSong: CurrentSong | undefined;
    canplay: boolean;
    error: boolean;
}
