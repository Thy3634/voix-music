<template>
  <main class="w-full h-screen flex justify-center z-0">
    <Swiper
      @progress="setProgress"
      :parallax="true"
      :breakpoints="{ 768: { slidesPerView: 2, spaceBetween: 0 } }"
      class="w-full max-w-screen-lg"
    >
      <!-- pagination -->
      <span
        class="absolute top-16 left-4 bg-transparent h-1.5 w-6 flex justify-between z-10 md:hidden"
      >
        <span
          class="w-1.5 h-1.5 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-50 rounded-full"
        ></span>
        <span class="absolute h-1.5 bg-black dark:bg-white rounded-full z-20" :style="dragStyles"></span>
        <span
          class="w-1.5 h-1.5 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-50 rounded-full"
        ></span>
      </span>

      <SwiperSlide>
        <h1
          data-swiper-parallax="480%"
          data-swiper-parallax-opacity="0"
          class="absolute left-4 top-8 bg-transparent text-2xl font-semibold z-10"
        >PLAY</h1>
        <Play />
      </SwiperSlide>
      <SwiperSlide>
        <h1
          data-swiper-parallax="240%"
          data-swiper-parallax-opacity="0"
          class="absolute left-4 top-8 bg-transparent text-2xl font-semibold z-10"
        >DISCOVER</h1>
        <Discover />
      </SwiperSlide>
    </Swiper>
  </main>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import 'swiper/swiper.scss'
import SwiperCore, { Parallax } from "swiper/core"
import Play from "./components/Play.vue"
import Discover from "./components/Discover.vue"
import _ from "lodash"
import { useUserStore } from "~/stores/user"
import { initPlayer } from "~/stores/player"

SwiperCore.use([Parallax])

export default defineComponent({
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    Play,
    Discover,
  },
  setup() {
    const user = useUserStore()
    initPlayer(!!user.token || !!document.cookie)
    /**
     * 进度
     */
    const progress = ref(0)
    /**
     * 设置进度
     */
    const setProgress = _.throttle((newValue, oldValue) => {
      progress.value = newValue.progress
    }, 200)
    /**
     * 滚动条位置、大小样式
     */
    const dragStyles = computed(() => {
      if (progress.value < 0.5) {
        return {
          width: `${1.5 - (0.5 - progress.value) * 1.2}rem`,
          left: 0,
        }
      } else {
        return {
          width: `${1.5 - (progress.value - 0.5) * 1.2}rem`,
          right: 0,
        }
      }
    })
    return {
      progress,
      setProgress,
      dragStyles,
    }
  }
});
</script>
<style scoped src="$/swiper.css">
</style>