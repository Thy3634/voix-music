declare module 'swiper/esm/vue/get-params';
declare module 'swiper/esm/vue/init-swiper' {
    import Swiper from "swiper/types/swiper-class";
    import { CSSSelector } from "swiper/types/shared";
    import { SwiperOptions } from "swiper/types/swiper-options";
    type SwiperParams = { container: CSSSelector | HTMLElement, options?: SwiperOptions }
    function initSwiper(swiperParams: SwiperParams): Swiper
    function mountSwiper(_ref: any, swiperParams: SwiperParams): void
}
declare module 'swiper/esm/vue/utils';
declare module 'swiper/esm/vue/loop';
declare module 'swiper/esm/vue/get-changed-params';
declare module 'swiper/esm/vue/get-children';
declare module 'swiper/esm/vue/update-swiper';
declare module 'swiper/esm/vue/virtual';
declare module 'swiper/esm/vue/swiper';
declare module 'swiper/esm/vue/swiper-slide';
declare module 'swiper/vue' {
    import { Swiper } from "swiper/esm/vue/swiper";
    import { SwiperSlide } from "swiper/esm/vue/swiper-slide";
    export {
        Swiper,
        SwiperSlide
    }
}
