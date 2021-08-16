<template>
  <div class="w-full h-full min-h-screen">
    <div class="h-20 relative">
      <h1 class="absolute text-2xl hidden md:block left-4 top-8 font-semibold z-10">Discover</h1>
    </div>
    <div
      class="sticky h-8 top-6 rounded-full flex px-2 items-center m-4 bg-gray-200 dark:bg-black focus-within:ring-1 ring-yellow-300"
    >
      <SearchIcon class="w-6 h-6 text-yellow-300" />
      <input
        type="search"
        v-model="search"
        class="bg-transparent text-gray-500 focus:text-inherit focus:outline-none px-2 w-full"
      />
    </div>
    <Swiper
      autoplay
      :slidesPerView="1.1"
      :spaceBetween="20"
      centeredSlides
      :pagination="{ dynamicBullets: true }"
      id="banner"
      class="w-full h-40 my-4"
    >
      <SwiperSlide v-for="banner in banners" :key="banner.id">
        <img
          :src="banner.pic"
          :alt="banner.tag"
          class="object-cover object-center rounded-xl w-full h-full"
        />
        <Tag size="sm" class="absolute left-2 bottom-2">#{{ banner.tag }}</Tag>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"
import 'swiper/swiper.scss';
import SwiperCore, { Pagination, Autoplay } from "swiper";
import 'swiper/components/pagination/pagination.scss';

import request from "~/utils/axios/request";
import Tag from "~/components/Tag.vue";
import SearchIcon from "!/icons/outline/search.svg?component";

import { defaultKeyword } from "~/api/search"

SwiperCore.use([Pagination, Autoplay])
export default defineComponent({
  name: 'Discover',
  components: {
    Swiper,
    SwiperSlide,
    Tag,
    SearchIcon,
  },
  setup() {
    const search = ref('');

    defaultKeyword().then((res) => search.value = res.data.realkeyword)

    const banners = ref([] as { id: string, pic: string, tag: string }[])

    request.post<{ banners: { pic: string, bannerId: string, typeTitle: string }[] }>({ url: "netease/banner?type=2" })
      .then((res) => {
        res.data.banners.forEach(b => {
          banners.value.push({ id: b.bannerId, pic: b.pic, tag: b.typeTitle })
        });
      })

    return {
      search,
      banners,
    }
  }
});
</script>
<style>
#banner
  > .swiper-pagination.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  right: -2vmin;
  top: 2vmin;
  left: unset;
  bottom: unset;
}
</style>
