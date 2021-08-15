// parse.ts
// 字符串解析
// 

type LrcLine = { t: number, l: string }
export type Lrc = LrcLine[]
/**
 * 解析 lrc 时间歌词
 * TODO: 解析 lrc 其他信息
 * @param src 字符串
 * @returns 歌词
 */
function lyric(src: string) {
    const lyric = src.split('\n')
    let lrc: Lrc = []
    for (let i = 0; i < lyric.length; i++) {
        //正则匹配播放时间
        const stimes = lyric[i].match(/\[\d{2}:\d{2}((\.|:)\d{2,3})\]/g)
        //过滤掉空行等非歌词正文部分
        if (stimes != null) {
            let stime = stimes[0]
            // 以时间为分割点分割每行歌词，数组最后一个为歌词正文 
            const line = lyric[i].split(stime)

            const l = line[line.length - 1]
            // 换算时间，保留两位小数
            stime = stime.slice(1, stime.length - 1)
            const times = String(stime).split(':')
            let t = 0
            if (times.length == 2) {
                t = parseInt(times[0]) * 60 + parseFloat(times[1]);
            } else if (times.length == 3) {
                t = parseInt(times[0]) * 60 + parseInt(times[1]) + parseFloat(times[2]) / 60
            } else {
                console.error(stime)
            }
            lrc.push({ t, l })
        }
    }
    return lrc
}
/**
 * 解析 url 参数，转换为参数对象模式
 * @param {string} url url地址 default: window.location.href
 * @return {object} 参数对象
 * @example '?id=12345&a=b' => {id:12345, a:b}
 */
function queryString(url?: string): Record<string, unknown> {
    url = !url ? window.location.href : url;
    if (url.indexOf('?') === -1) {
        return {};
    }
    const search: string =
        url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
    if (search === '') {
        return {};
    }
    const newSearch: string[] = search.split('&');
    const query: Record<string, unknown> = {};
    for (let i = 0, len = newSearch.length; i < len; i++) {
        const pair: string[] = newSearch[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};
export default {
    lyric,
    queryString
}