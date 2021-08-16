import { ResponseUserprofile } from "./userprofile";

export interface ResponsePlaylist {
    id: number
    name: string
    coverImgUrl: string
    creater: ResponseUserprofile
    description: string
}