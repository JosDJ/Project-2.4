import { Song } from "./song";

export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    currentSong: Song | undefined;
    canplay: boolean;
    error: boolean;
}
