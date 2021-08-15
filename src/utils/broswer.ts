/**
 * @description: 获取客户端类型
 * @return {boolean} {isQQBrowser: boolean}
 * @example getBrowser().isIos => false
 */
export function getBrowser() {
    const ua = window.navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isIos = /iphone|ipad|ipod/i.test(ua);
    const isWeChat = /micromessenger\/([\d.]+)/i.test(ua);
    const isWXProgram = /miniprogram\/([\d.]+)/i.test(ua);
    const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
    const isQQ = /qq\/([\d.]+)/i.test(ua);
    const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);
    const isQZone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
    const isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid;
    const isSafari =
        /safari\/([\d.]+)$/i.test(ua) &&
        isIos &&
        ua.indexOf('Crios') < 0 &&
        ua.indexOf('Mozilla') === 0;
    const isApp = ua.indexOf('platform=ios') > -1 || ua.indexOf('platform=android') > -1;
    // const isWX = /micromessenger/.test(ua.toLocaleLowerCase());
    return {
        isAndroid,
        isIos,
        isWeChat,
        isWXProgram,
        isWeibo,
        isQQ,
        isQQBrowser,
        isQZone,
        isOriginalChrome,
        isSafari,
        isApp,
    };
}