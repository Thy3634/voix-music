import axios from "axios";
import { ResponseAlbum } from "./album";
import { ResponseArtist } from "./artist";
import { ResponseMV } from "./mv";
import { ResponsePlaylist } from "./playlist";
import { ResponseSong } from "./song";
import { ResponseUserprofile } from "./userprofile";

export async function defaultKeyword() {
    return (await axios.get<{
        code: number,
        data: {
            showKeyword: string,
            realkeyword: string,
            serchType: number
        }
    }>('netease/search/default')).data
}

enum searchType {
    single = 1,
    album = 10,
    artist = 100,
    list = 1000,
    user = 1002,
    mv = 1004,
}

export async function cloudsearch(keywords: string, limit = 30, offset = 0, type: searchType = 1) {
    return (await axios.get<{
        code: number,
        result: {
            songCount: number,
            songs: ResponseSong[],
            userprofileCount: number,
            userprofiles: ResponseUserprofile[],
            playlistCount: number,
            playlists: ResponsePlaylist[],
            artistCount: number,
            artusts: ResponseArtist[],
            albumCount: number,
            albums: ResponseAlbum[],
            mvCount: number,
            mvs: ResponseMV[],
        }
    }>('netease/cloudsearch', { params: { keywords, limit, offset, type } })).data
}

