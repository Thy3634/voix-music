<template>
  <Swiper pagination class="w-full h-screen">
    <SwiperSlide
      v-for="slide in slides"
      :key="slide.from"
      class="flex flex-col sm:flex-row items-center p-4 justify-center sm:justify-around w-full"
    >
      <div class="squre-img relative inline-block">
        <img :src="slide.image" :alt="slide.from" class="object-cover rounded-2xl w-full h-full" />
        <span class="absolute left-2 bottom-2">
          <Tag v-for="tag in slide.tags" :key="tag" size="sm" class="mr-1 last:mr-0">{{ tag }}</Tag>
        </span>
      </div>
      <div class="discription flex flex-col justify-around mx-4 md:text-lg">
        <div>
          <QuoteLeft class="block md:w-8 md:h-8" />
          <p class="mb-4 leading-6 tracking-widest">
            {{ slide.quote }}
            <QuoteRight class="inline-block transform translate-y-1 md:w-8 md:h-8" />
          </p>
          <span class="block text-right">{{ slide.from }}</span>
        </div>
        <LogoText class="transform origin-left md:scale-125" />
      </div>
    </SwiperSlide>
    <SwiperSlide class="flex flex-col sm:flex-row items-center justify-around">
      <div class="mx-6">
        <div class="text-white text-7xl md:text-8xl font-black font-sans">
          <p>CELESTE</p>
          <p>VOIX</p>
        </div>
        <div class="flex sm:items-center sm:justify-around mt-4 md:mt-8">
          <LogoText class="md:scale-125" />
          <router-link
            to="/login"
            class="hidden sm:inline-block ml-4 bg-theme rounded-full px-4 py-2 font-bold text-black"
          >Let's VOIX</router-link>
        </div>
      </div>
      <router-link
        to="/login"
        class="sm:hidden bg-theme rounded-full px-4 py-2 font-bold text-black"
      >Let's VOIX</router-link>
    </SwiperSlide>
  </Swiper>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from "vue";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css'
import LogoText from "#/LogoText.vue";
import QuoteLeft from "!/icons/solid/quote-left.svg?component"
import QuoteRight from "!/icons/solid/quote-right.svg?component"
import Tag from "#/Tag.vue";


SwiperCore.use([Pagination])

export default defineComponent({
  name: "Opening",
  components: {
    Swiper,
    SwiperSlide,
    LogoText,
    QuoteLeft,
    QuoteRight,
    Tag,
  },
  setup() {
    const active = ref(0)
    const slides = reactive([
      {
        image: "src/assets/opening/AndyWarhol.png",
        tags: ["#1967", "#Andy Warhol"],
        quote: "V.U.将会比Beatles更有成就，受其影响的乐队将会不计其数…",
        from: "安迪 • 沃霍尔"
      },
      {
        image: "src/assets/opening/TR808.png",
        tags: ["#808s & Heartbreak", "#Revolution"],
        quote: "Roland TR-808 重新定义了当代说唱音乐，成为说唱文化的重要组成部分。",
        from: "《The Verge》"
      },
      {
        image: "https://pic.rmb.bdstatic.com/29253aa31a314c68589f82b0d64e399b.jpeg",
        tags: ["#音乐使人自由", "#YMO"],
        quote: "对于有崭新的创造性和自由想法的音乐，我还是非常想保持拍手称赞的态度。",
        from: "坂本龙一"
      },
      {
        image: "src/assets/opening/TOMBOY.jpeg",
        tags: ["#K-indie", "韩流来袭"],
        quote: "熬过讨厌的20岁 你看上去百无聊赖燃起的火 可不能瞬间化为乌有…",
        from: "TOMBOY - 혁오"
      }
    ])
    return {
      active,
      slides
    }
  },
});
</script>
<style src="$/swiper.css">
</style>
<style scoped>
.squre-img {
  width: 90vw;
  height: 90vw;
  max-width: 32rem;
  max-height: 32rem;
}
.discription {
  height: 100%;
  max-width: 32rem;
  max-height: 40vh;
  min-height: 30vh;
}
@media (min-width: 640px) {
  .squre-img {
    width: 50vw;
    max-width: 80vh;
    height: 50vw;
    max-height: 80vh;
    flex-shrink: 0;
  }
  .discription {
    height: 40vw;
    max-height: 80vh;
    max-width: 40vw;
  }
}
</style>