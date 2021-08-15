<template>
  <div class="w-screen h-screen">
    <div class="h-20"></div>
    <input
      type="search"
      class="sticky h-8 top-6 bottom-24 rounded-full bg-gray-200 dark:bg-black m-4"
    />
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

SwiperCore.use([Pagination, Autoplay])

export default defineComponent({
  name: 'Discover',
  components: {
    Swiper,
    SwiperSlide,
    Tag,
  },
  setup() {
    const search = ref('')
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
  top: 3vmin;
  left: unset;
  bottom: unset;
}
</style>
