import { Artist } from "./artist";
import { FileUploaded } from "./file-uploaded";

export interface Song {
    id: number;
    title: string;
    artists: Array<Artist>;
    album_id: number;
    file: FileUploaded;
}