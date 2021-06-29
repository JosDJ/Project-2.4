export interface AlbumIn {
    title: string;
    artist_id: number;
    release_date: Date;
    genre_id: number;
    song_ids: number[];
    album_cover_id: number;
}