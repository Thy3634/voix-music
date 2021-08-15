import { defineStore } from "pinia";
import { recommend, Song, downloadSong, getLrc } from "~/api/song";
import format from "~/utils/format";
import parse, { Lrc } from "~/utils/parse";

export const usePlayerStore = defineStore({
    id: "player",
    state() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        ctx.suspend()
        const als = ctx.createAnalyser()
        als.fftSize = 2048
        let list = [] as Song[]
        return {
            ctx,
            als,
            index: 0,
            list,
            time: 0,
            offsetTime: 0,
            state: "closed" as AudioState,
            duration: 0,
            lrc: [{ t: 0, l: "" }] as Lrc,
            lrcIndex: 0,
            stop: async () => { },
        }
    },
    getters: {
        stime: (state): string => format.minuteSecond(state.time),
        sduration: (state): string => format.minuteSecond(state.duration),
        currentLrc: (state): string => state.lrc[state.lrcIndex].l,
    },
    actions: {
        async play(when?: number, offset?: number) {
            const src = this.ctx.createBufferSource()
            src.connect(this.als)
            this.als.connect(this.ctx.destination)
            if (this.index < 0) {
                this.index += this.list.length
            }
            this.index = this.index % this.list.length

            let buffer
            buffer = await this.getBuffer()
            while (!buffer) {
                this.index = (this.index + 1) % this.list.length
                buffer = await this.getBuffer()
            }
            src.buffer = buffer

            this.lrc = await this.getLrc()
            src.onended = (ev) => {
                this.index += 1
                this.play()
            }
            this.stop = async () => {
                src.stop()
            }
            this.ctx.resume()
            this.state = "running"
            src.start(when, offset)

            this.duration = src.buffer.duration
            this.offsetTime = this.ctx.currentTime
            this.lrcIndex = 0
        },
        async getBuffer() {
            let buffer = this.list[this.index].buffer
            if (!buffer) {
                const url = this.list[this.index].url
                if (!url) {
                    return
                } else {
                    this.state = "loading"
                    this.list[this.index].buffer = await this.ctx.decodeAudioData(await downloadSong(url))
                    return this.list[this.index].buffer
                }
            }
            return buffer
        },
        async getLrc() {
            let lrc = this.list[this.index].lyric
            if (!lrc) {
                this.list[this.index].lyric = parse.lyric(await getLrc(this.list[this.index].id))
                return this.list[this.index].lyric!
            }
            return lrc
        },
        /**
         * 
         * @param i 下标
         */
        async switch(i: number) {
            this.index = i - 1
            await this.stop()
        },
        /**
         * 暂停或继续播放
         */
        async toggle() {
            switch (this.state) {
                case "suspended":
                    await this.ctx.resume()
                    return
                case "running":
                    await this.ctx.suspend()
                    return
            }
        }
    }
})

export async function initPlayer(logined?: boolean) {
    const store = usePlayerStore()
    store.ctx.addEventListener("statechange", (ev) => {
        store.state = store.ctx.state
    })

    setInterval(() => {
        if (store.state == "running") {
            store.time = store.ctx.currentTime - store.offsetTime
            if (store.lrcIndex + 1 < store.lrc.length && store.lrc[store.lrcIndex + 1].t < store.time) {
                store.lrcIndex += 1
            }
        }
    }, 1000)
    if (logined) {
        store.list = await recommend()
        store.play(0)
    }
}
/**
 * 状态
 * @description "loading" 时 ctx 处在 "suspended" 状态
 */
type AudioState = "loading" | AudioContextState
