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
            src: undefined as unknown as AudioBufferSourceNode
        }
    },
    getters: {
        stime: (state): string => format.minuteSecond(state.time),
        sduration: (state): string => format.minuteSecond(state.duration),
        currentLrc: (state): string => state.lrc[state.lrcIndex].l,
        progress: (state): number => state.time / state.duration,
    },
    actions: {
        async play() {
            // state
            const preState = this.state
            this.ctx.suspend()
            this.state = "loading"

            // load
            const src = this.ctx.createBufferSource()
            src.connect(this.als)
            this.als.connect(this.ctx.destination)
            if (this.index < 0) {
                this.index += this.list.length
            }
            this.index = this.index % this.list.length
            // load buffer
            let buffer
            buffer = await this.getBuffer()
            while (!buffer) {
                this.index = (this.index + 1) % this.list.length
                buffer = await this.getBuffer()
            }
            src.buffer = buffer
            // load lrc
            this.lrc = await this.getLrc()
            this.src = src

            // onended
            src.onended = () => {
                this.switch()
            }

            // state recover
            switch (preState) {
                case 'running':
                    src.start()
                    this.ctx.resume()
                    this.state = 'running'
                    break;
                case 'loading':
                case 'suspended':
                    src.start()
                    this.ctx.suspend()
                    this.state = 'suspended'
                case 'closed':
                    this.ctx.suspend()
                    this.state = 'closed'
                    break;
            }

            // reset
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
                    try {
                        this.list[this.index].buffer = await this.ctx.decodeAudioData(await downloadSong(url))
                    } catch (error) {
                        return
                    }
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
         * @param i 下标 @default next
         */
        switch(i?: number) {
            // stop current
            this.src.stop()
            i = i ? i : this.index + 1
            this.index = i
            this.play()
        },
        /**
         * 暂停或继续播放
         */
        async toggle() {
            switch (this.state) {
                case "suspended":
                    await this.ctx.resume()
                    this.state = 'running'
                    break
                case "running":
                    await this.ctx.suspend()
                    this.state = 'suspended'
                    break
                case 'closed':
                    this.src.start()
                    await this.ctx.resume()
                    this.state = 'running'
                    break
            }
        }
    }
})

export async function initPlayer(logined?: boolean) {
    const store = usePlayerStore()
    // store.ctx.addEventListener("statechange", (ev) => {
    //     store.state = store.ctx.state
    // })

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
        store.play()
    }
}
/**
 * 状态
 * @description "loading" 时 ctx 处在 "suspended" 状态
 */
type AudioState = "loading" | AudioContextState
