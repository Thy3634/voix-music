export default class WebAudio {
    // 上下文
    private _ctx: AudioContext
    // 播放节点
    private _src: AudioBufferSourceNode
    // 频率分析节点
    private _als: AnalyserNode
    // 增益节点
    private _gain: GainNode

    constructor() {
        this._ctx = new AudioContext()
        this._als = this._ctx.createAnalyser();
        // 确定频域的快速傅里叶变换大小
        this._als.fftSize = 2048;
        // 这个属性可以让最后一个分析帧的数据随时间使值之间的过渡更平滑。
        this._als.smoothingTimeConstant = 0.6;
        // 创建音量节点(如果你需要用调整音量大小的话)
        this._gain = this._ctx.createGain();
        // 增益器连接分析器
        this._gain.connect(this._als);
        // 分析器连接终端（扬声器）
        this._als.connect(this._ctx.destination);
        this._src = this._ctx.createBufferSource()
    }
    /**
     * 音量
     **/
    public get volume(): number {
        return this._gain.gain.value
    }
    /**
     * 音量
     **/
    public set volume(v: number) {
        console.assert(0 <= v && v <= 1)
        this._gain.gain.value = v;
    }
    /**
     * 播放进度
     **/
    public get currentTime(): number {
        return this._ctx.currentTime
    }
    /**
     * 播放状态
     */
    public get state(): AudioContextState {
        return this._ctx.state
    }
    /**
     * 暂停或继续播放
     */
    public resumeOrSuspend() {
        switch (this._ctx.state) {
            case "closed":
            case "suspended":
                this._ctx.resume()
                break
            case "running":
                this._ctx.suspend()
                break
            default:
                console.error(`context state:${this._ctx.state}`)
        }
    }
    /**
     * 音频时长
     */
    public get duration() {
        return this._src.buffer?.duration
    }
    /**
     * 异步解码并播放
     */
    public decodeAndPlay(buffer: ArrayBuffer) {
        this._ctx.decodeAudioData(buffer, (audioBuffer) => {
            this._src = this._ctx.createBufferSource()
            this._src.connect(this._gain)
            this._src.buffer = audioBuffer
            this._src.connect(this._ctx.destination)
            // this._src.start()
            this.resumeOrSuspend()
        }, (error) => {
            console.error(`Decoding buffer: ${error.name}: ${error.message}`);
        }).catch((e) => {
            console.error(`Building audio source node: ${e}`)
        })
    }
}