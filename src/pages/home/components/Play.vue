<template>
  <component :is="player"></component>
</template>
<script lang='ts'>
import { computed, defineComponent } from "vue";
import SwiperPlayer from "./SwiperPlayer.vue";
import { useSettingStore } from "~/stores/setting";

export default defineComponent({
  name: "Play",
  components: {
    SwiperPlayer,
  },
  setup() {
    const setting = useSettingStore()
    const player = computed(() => {
      switch (setting.player) {
        case 'swiper':
          return SwiperPlayer
        default:
          break;
      }
    })
    return {
      player
    }
  }
});
</script>
<style scoped>
</style>