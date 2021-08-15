/**
 * 将秒转化为分秒
 * @param 秒数
 * @example 74 => '01:14'
 */
function minuteSecond(s: number) {
    s = Math.round(s)
    let min = 0
    if (s > 60) {
        min = Math.round(s / 60)
        s = s % 60
    }
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

/**
 * @description: 获取文件后缀名
 * @param {string} filePath file地址
 * @return {string} 文件后缀
 * @example 'https://baidu.com/file/123.mp4' => 'mp4'
 */
const fileType = (filePath: string): string => {
    const startIndex: number = filePath.lastIndexOf('.');
    if (startIndex !== -1) {
        return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
    } else {
        return '';
    }
};

/**
 * @description: 格式化手机号为 3-4-4结构
 * @param {string} v 输入连续字符或数字
 * @return {string} 格式化数字
 * @example '12 345654444' => '123 4565 4444'
 */
const phoneNumber = (v: string): string => {
    const removeAllSpace = (v: string) => v.replace(/\s+/g, '');
    const _v: string = removeAllSpace(v);
    let res = '';
    if (isNaN(Number(_v))) {
        return v;
    } else {
        if (_v.length >= 3 && _v.length <= 7) {
            const FIRST_PART = _v.substr(0, 3);
            const SECOND_PART = _v.substr(3);
            res = FIRST_PART + ' ' + SECOND_PART;
        } else if (_v.length > 7) {
            const FIRST_PART = _v.substr(0, 3);
            const SECOND_PART = _v.substr(3, 4);
            const THIRD_PART = _v.substr(7);
            res = FIRST_PART + ' ' + SECOND_PART + ' ' + THIRD_PART;
        }
        return res;
    }
};

/**
 * @description: 金钱“,”格式处理，保留n位小数
 * @param {string | number} s 需要处理的数
 * @param {string | number} n 需要保留的小数位数, 默认2位小数
 * @return {*}
 */
const money = (s: string | number, n: string | number): string => {
    if (!s && s !== 0) {
        return '0.00';
    }
    if (isNaN(+s)) {
        return '0.00';
    }
    const num = Number(n) || 2;
    const arr = (s + '').split('.');
    const intStr = arr[0] ? arr[0] : 0;
    let floatStr = arr[1] ? arr[1] : 0;
    if (floatStr === 0) {
        floatStr = '0';
        for (let i = 0; i < num - 1; i++) {
            floatStr += '0';
        }
    } else {
        floatStr = (+('0.' + floatStr)).toFixed(num).split('.')[1];
    }
    return (intStr + '.' + floatStr).replace(/(\d{1,3})(?=(?:\d{3})+\.)/g, '$1,');
};

/**
 * @description: 强制保留n位小数
 * @param {number} value
 * @param {number} n
 * @return {*}
 */
const round = (value: number, n: number): string | number => {
    const v = Math.round(value * 100) / 100;
    const xsd = v.toString().split('.');
    let res;
    if (xsd.length === 1) {
        res = v.toString() + '.' + '0'.repeat(n);
        return res;
    } else if (xsd.length > 1) {
        if (xsd[1].length < n) {
            res = v.toString() + '0';
        } else {
            res = '';
        }
        return res;
    } else {
        return value;
    }
};

/**
 * @description: 格式化百分比
 * @param {number} value 被格式数值
 * @param {number} n 保留小数位
 * @return {*}
 */
const percent = (value: number, n: number = 1): string => {
    return (value * 100).toFixed(n) + '%';
};

export default {
    minuteSecond,
    fileType,
    phoneNumber,
    money,
    round,
    percent,
}