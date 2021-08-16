<template>
  <div class="w-full h-full">
    <SwiperPlayer v-if="player == 'swiper'" @open-artists="artistsOpen = true"></SwiperPlayer>
    <div v-show="artistsOpen" class="absolute bottom-0 p-4 bg-">
      <div v-for="artist in artists"></div>
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
import { useSettingStore } from "~/stores/setting";
import { usePlayerStore } from "~/stores/player";

import SwiperPlayer from "./SwiperPlayer.vue";
import Avatar from "#/Avatar.vue";

export default defineComponent({
  name: "Play",
  components: {
    SwiperPlayer,
    Avatar,
  },
  setup() {
    const setting = useSettingStore()
    const player = usePlayerStore()
    const artistsOpen = ref(false)

    return {
      player: computed(() => setting.player),
      artistsOpen,
      artists: computed(() => player.list[player.index].artists)
    }
  }
});
</script>
<style scoped>
</style>
