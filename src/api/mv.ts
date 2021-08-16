import { ResponseArtist } from "./artist";

export interface ResponseMV {
    id: number
    name: string
    playCount: number
    artistId: number
    artistName: string
    artists: ResponseArtist[]
    cover: string
    duration: number
}