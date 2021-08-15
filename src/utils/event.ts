/**
 * 键
 */
type Key = string | Symbol | number
/**
 * 事件处理函数
 */
type Handler<A = any> = (args?: A) => void
/**
 * 事件
 */
export class Event<A = any> {
    private _handlers: Map<Key, Handler>
    constructor() {
        this._handlers = new Map<Key, Handler>()
    }
    /**
     * 添加事件处理函数
     * @param handler 事件处理函数
     * @param key 键
     * @returns 成功则返回 key，否则返回 false
     */
    add(handler: Handler<A>, key?: Key) {
        if (key) {
            if (this._handlers.has(key)) {
                throw new Error(`Duplicated key: ${key}`);
            } else {
                this._handlers.set(key, handler)
                return key
            }
        } else {
            const key = Symbol(this._handlers.size)
            this._handlers.set(key, handler)
            return key
        }
    }
    /**
     * 移除事件处理函数
     * @param key 键
     * @returns 成功与否
     */
    remove(key: Key) {
        if (this._handlers.has(key)) {
            this._handlers.delete(key)
        } else {
            throw new Error(`No this key to remove: ${key}`);

        }
    }
    /**
     * 清空事件处理函数
     */
    clear() {
        this._handlers.clear()
    }
    /**
     * 触发事件，执行所有事件处理函数
     * @param args 参数
     */
    emit(args?: A) {
        this._handlers.forEach(handler => {
            handler(args)
        })
    }
}