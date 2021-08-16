<template>
  <div
    @click="toggle"
    class="w-full h-screen flex flex-col justify-center relative"
    :class="state == 'loading' ? 'cursor-wait' : ''"
  >
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
        @dblclick.stop="love(i)"
        class="w-full h-full flex flex-col"
      >
        <div class="w-full h-full flex flex-col justify-between">
          <img
            :src="song.album.pic"
            :alt="song.album.name"
            class="absolute top-0 left-0 w-full h-full object-cover object-center filter"
            :class="state != 'running' ? 'brightness-50' : ''"
          />
          <div class="text-xl font-bold mt-24 mx-4 z-10">{{ currentLrc }}</div>

          <div class="z-10">
            <div class="flex flex-wrap gap-2 mx-4">
              <Tag size="sm" class="cursor-pointer">+歌曲故事</Tag>
              <Tag v-for="tag in song.tags" :key="tag" size="sm" class="cursor-pointer">#{{ tag }}</Tag>
            </div>

            <div class="flex justify-between my-2 mx-4">
              <div class="flex flex-col gap-y-2">
                <h3 class="text-xl">{{ song.name }}</h3>
                <div @click.stop="showArtists" class="flex items-center gap-2 cursor-pointer">
                  <span class="inline-flex -space-x-4">
                    <Avatar
                      v-for="ar in song.artists"
                      :src="ar.avatar"
                      :key="ar.id"
                      :alt="ar.name"
                    />
                  </span>
                  <span>{{ song.artists.map((ar) => ar.name).join(' / ') }}</span>
                </div>
              </div>
              <div>
                <HeartIcon
                  @click.stop="love(i)"
                  class="w-9 h-9 cursor-pointer transition-colors"
                  :class="song.like ? 'text-red-500' : ''"
                />
                <DotHorizontalIcon class="w-9 h-9 cursor-pointer" />
              </div>
            </div>
            <Wave v-if="index == i" class="w-full h-24 z-20"></Wave>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div
      class="absolute text-white z-20 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <LoadingIcon v-if="state == 'loading'" class="w-10 h-10 animate-spin"></LoadingIcon>
      <PlayIcon v-else-if="state == 'suspended' || state == 'closed'" class="w-10 h-10"></PlayIcon>
    </div>
    <div
      v-show="state != 'running'"
      class="absolute z-20 bottom-0 h-1 bg-yellow-300"
      :style="{ width: sProgress }"
    ></div>
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
import HeartIcon from "!/icons/solid/heart.svg?component"
import DotHorizontalIcon from "!/icons/outline/dots-horizontal.svg?component"
import router from "~/router";

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
  emits: ['open-artists'],
  setup(props, { emit }) {
    const index = ref(0)
    const onSlideChange = (swiper: any) => {
      index.value = swiper.activeIndex
    }
    const swiper = ref(null as unknown as typeof Swiper)
    const getSwiper = (s: typeof Swiper) => swiper.value = s
    const player = usePlayerStore()

    watch(index, async (i) => {
      if (player.index != i) {
        player.switch(i)
      }
    })

    watch(() => player.index, (i) => {
      index.value = i
      swiper.value.slideTo(i, 1000, false)
    })

    const love = (i: number) => {
      player.list[i].like = !player.list[i].like
    }

    const showArtists = () => {
      if (player.list[index.value].artists.length == 1) {
        router.push({ path: `/artist/${player.list[index.value].artists[0].id}` })
      }
      else {
        emit('open-artists')
      }
    }

    return {
      getSwiper,
      index,
      onSlideChange,
      list: computed(() => player.list),
      state: computed(() => player.state),
      currentLrc: computed(() => player.currentLrc),
      toggle: () => player.toggle(),
      love,
      showArtists,
      sProgress: computed(() => `${player.progress * 100}%`),
    }
  },
});
</script>