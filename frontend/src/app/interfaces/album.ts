import { Artist } from "./artist";
import { FileUploaded } from "./file-uploaded";
import { Genre } from "./genre";
import { Song } from "./song";

export interface Album {
    id: number;
    title: string;
    artist: Artist;
    release_date: string;
    genre: Genre;
    songs: Song[];
    album_cover: FileUploaded;
}