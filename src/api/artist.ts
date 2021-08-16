import { request } from "http";

function avator() {
    "data.user.avatarUrl"
}

export interface ResponseArtist {
    id: number,
    name: string,
    picUrl: string,
    followed?: boolean,
}