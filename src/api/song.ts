import axios from "axios"

import { Lrc } from "~/utils/parse"

/**
 * 每日推荐歌曲
 */
export async function recommend() {
    const { data: { dailySongs } } = (await axios.get<{ data: { dailySongs: [{ id: number, name: string, al: { id: number, name: string, picUrl: string }, reason: string, ar: Artist[], mv: number }] } }>("netease/recommend/songs")).data
    const ids: number[] = []
    const songs: Song[] = []
    for (const song of dailySongs) {
        let artists: Artist[] = []
        for (const ar of song.ar) {
            artists.push({ id: ar.id, name: ar.name })
        }
        ids.push(song.id)
        songs.push({ id: song.id, name: song.name, artists, album: { id: song.al.id, name: song.al.name, pic: song.al.picUrl }, tags: song.reason ? [song.reason] : [], mv: { id: song.mv }, url: "" })
    }
    // 异步请求 url
    // TODO: websocket请求对应的歌曲并解码
    const data = await getSongsUrl(...ids)
    for (let i = 0; i < data.length; i++) {
        const index = songs.findIndex((s) => s.id == data[i].id)
        if (index) {
            songs[index].url = data[i].url
        }
        // songs[i].buffer = await audio.decode((await download.mpeg({ url: urls[i].url })).data)
    }
    return songs
}

/**
 * @param ids 歌曲 ID
 * @returns 歌曲音频 url
 */
export async function getSongsUrl(...ids: number[]) {
    return (await axios.get<{ data: { id: number, url: string }[] }>("netease/song/url", {
        params: { id: ids.join(',') }
    })).data.data
}

/**
 * 根据 URL 下载歌曲
 */
export async function downloadSong(url: string) {
    return (await axios.get<ArrayBuffer>(url, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'audio/mpeg'
        }
    })).data
}

/**
 * @param id 歌曲 ID
 * @returns .lrc 歌词
 */
export async function getLrc(id: number) {
    return (await axios.get<{ lrc: { lyric: string } }>('netease/lyric', { params: { id } })).data.lrc.lyric
}

export interface Song {
    id: number
    name: string
    url?: string
    artists: Artist[]
    album: Album
    tags: string[]
    like?: boolean
    mv: MV
    lyric?: Lrc
    buffer?: AudioBuffer
    pic?: string
}
/**
 * 专辑
 */
export interface Album {
    id: number
    name: string
    pic: string
}
export interface Artist {
    id: number
    avatar?: string,
    name: string
}
export interface MV {
    id: number
    name?: string,
    cover?: string
    url?: string
}