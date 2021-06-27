import { Artist } from "./artist";
import { UploadedFile } from "./uploaded-file";

export interface Song {
    id: number;
    title: string;
    artists: Array<Artist>;
    album_id: number;
    file: UploadedFile;
}