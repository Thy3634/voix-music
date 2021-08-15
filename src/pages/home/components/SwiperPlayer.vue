<template>
  <div @click="toggle" class="w-full max-w-screen-sm h-screen flex flex-col justify-center">
    <Swiper
      virtual
      direction="vertical"
      class="w-full h-full"
      @swiper="getSwiper"
      @slideChange="onSlideChange"
      ref="swiper"
    >
      <SwiperSlide
        v-for="(song, i) in list"
        :key="song.id"
        :virtualIndex="i"
        class="w-full h-full flex flex-col justify-center"
      >
        <div class="w-screen h-2/3 flex flex-col justify-between">
          <img
            :src="song.album.pic"
            :alt="song.album.name"
            class="absolute top-0 left-0 w-full h-full object-cover object-center filter"
            :class="state != 'running' ? 'brightness-50' : ''"
          />
          <div class="mx-4 text-xl h-1/3 font-bold z-10">{{ currentLrc }}</div>
          <div class="mx-4 z-10">
            <div class="space-x-2">
              <Tag size="sm">+歌曲故事</Tag>
              <Tag v-for="tag in song.tags" :key="tag" size="sm">#{{ tag }}</Tag>
            </div>

            <div class="flex justify-between my-2">
              <h3 class="text-xl">{{ song.name }}</h3>
              <HeartIcon
                @click.capture="love(i)"
                class="w-9 h-9"
                :class="song.like ? 'text-red-500 love' : ''"
              />
            </div>
            <div class="flex justify-between">
              <span>
                <span class="mr-2">
                  <Avatar
                    v-for="ar in song.artists"
                    :src="ar.avatar"
                    :key="ar.id"
                    :alt="ar.name"
                    class="-mr-4 last:mr-0"
                  />
                </span>
                <span class="text-lg">{{ song.artists.map((ar) => ar.name).join('/') }}</span>
              </span>
              <DotHorizontalIcon class="w-9 h-9" />
            </div>
          </div>
        </div>
        <Wave v-if="state == 'running' && index == i" class="fixed bottom-0 z-20"></Wave>
      </SwiperSlide>
    </Swiper>
    <component :is="stateIcon" class="fixed w-10 h-10 text-white z-20 self-center"></component>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, inject, ref, watch } from "vue";
import { usePlayerStore } from "~/stores/player";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Virtual, Lazy } from "swiper/core";
import Tag from "~/components/Tag.vue";
import Avatar from "~/components/Avatar.vue";
import Wave from "./Wave.vue";
import PlayIcon from "!/icons/solid/play.svg?component"
import LoadingIcon from "!/icons/solid/loading.svg?component";
import HeartIcon from "!/icons/outline/heart.svg?component"
import DotHorizontalIcon from "!/icons/outline/dots-horizontal.svg?component"

SwiperCore.use([Virtual, Lazy])

export default defineComponent({
  name: 'SwiperPlayer',
  components: {
    Swiper,
    SwiperSlide,
    Tag,
    Avatar,
    Wave,
    PlayIcon,
    LoadingIcon,
    HeartIcon,
    DotHorizontalIcon
  },
  setup() {
    const index = ref(0)
    const onSlideChange = (swiper: any) => {
      index.value = swiper.activeIndex
    }
    // let swiper: typeof Swiper
    const swiper = ref(null as unknown as typeof Swiper)
    const getSwiper = (s: typeof Swiper) => swiper.value = s
    const player = usePlayerStore()
    watch(index, async (i) => {
      if (player.index != i) {
        await player.switch(i)
      }
    })
    watch(() => player.index, (i) => {
      index.value = i
      swiper.value.slideTo(i, 1000, false)
    })
    const love = (i: number) => {
      player.list[i].like = !player.list[i].like
    }
    const stateIcon = computed(() => {
      switch (player.state) {
        case 'loading':
          return LoadingIcon
        case 'running':
          return 'template'
        default:
          return PlayIcon
      }
    })
    return {
      getSwiper,
      index,
      onSlideChange,
      list: computed(() => player.list),
      state: computed(() => player.state),
      currentLrc: computed(() => player.currentLrc),
      toggle: () => player.toggle(),
      stateIcon,
      love,
    }
  },
});
</script>
<style scoped>
.love {
  animation: ping 1s cubic-bezier(0.4, 0, 1, 0.1) 1;
}
</style>