<template>
  <!-- <van-swipe
    :loop="false"
    :show-indicators="false"
  >
    <van-swipe-item>
      play
    </van-swipe-item>
    <van-swipe-item>
      descover
    </van-swipe-item>
  </van-swipe> -->
  <div>something<div>something</div>
  </div>
  <div>something</div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { Swipe, SwipeItem } from "vant";
export default defineComponent({
  name: "home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  setup() {

  }
});
</script>
<style scoped>
</style>