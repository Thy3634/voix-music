## 项目概述
web音乐app。UI模仿自MOO。暂时采用网易云音乐API。

## 项目技术栈
| 类型 | 库 |
| --- | --- |
| 视图层框架 | Vue3 |
| 语言 | TypeScript |
| 环境 | vite |
| 样式库 | tailwindCSS+sass |
| 状态管理库 | pinia |
| js常用库 | lodash |
| ajax库 | axios |
| 路由库 | vue-router |
| 额外组件 | swiper |
| 动画库 | gsap |

## 项目特色
- 大量流畅、精美的动画

- 高可交互的UI

- webAudio实现音频播放，可实现音频可视化、频谱调整等

- 高效的异步处理

- 大量自定义组件

- 夜间模式

## 已实现功能
- 页面
    - 开屏页
    - 登录页
    - 主页
        - Play 页

- 用户登录及其状态管理

- 音频及播放列表状态管理、类短视频滑动播放器

- 音频可视化（canvas）

- 自定义组件：Input（Material Design）、Icon（Svg）、Avatar、Modal（teleport）、Tag（多级别）等

## 细节
- axios 封装：request、download 两个实例，分布处理普通请求（带 cookie）和下载请求（2进制文件）

- canvas 实现音频可视化（requestAnimationFrame 帧渲染）

- 登录状态轮询机制

- 特殊组件渲染使用 lodash.throttle 限流

- 监听swiper事件， 实现播放列表下标双向绑定

- swiper 使用 virtual，节约内存。懒加载音频和歌词

- lrc 歌词解析，实时计算歌词位置

## 下一步要实现的功能
- 登录状态自动续航

- 滑动播放器背景可采用视频

- 音频频谱调整器

- 完善其他页面
    - Discover 页
    - User 页
    - Article 页
    - Artist 页
    - List 页
    - Album 页
    - Setting 页

## 吐槽
- swiper/vue 并不好用，响应式全无，尤其是 activeIndex 不能作为 prop 使用非常糟糕，主要是靠 emit。

- TypeScript 环境仍然不咋地。
    - EventTarget 的类型没有我不能理解。
    - 上面 swiper 对 react、angular 等加了类型文件，就是没有 vue 的
    - vue3 对 TypeScript 结合是很好，就是官方文档对 TS 的介绍还是少了点。我仍然不知道 prop 怎么用枚举类型。

## 声明
- 仅用于学习