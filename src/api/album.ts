import { ResponseArtist } from "./artist";

export interface ResponseAlbum {
    id: number,
    name: string,
    alias: string[],
    artists: ResponseArtist[],
    picUrl: string,
    company: string,
    songs: [],
    publishTime: number,
    type: 'Single' | 'DEMO'
}