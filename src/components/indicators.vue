<template>
  <div class="indicators">
    <div
      v-for="i of num"
      :key="i"
      :style="{backgroundColor: color, height: active==i-1 ? activeSize:size, width:active==i-1 ? activeSize:size, opacity: active==i-1 ? 1: 0.3}"
      class="indicator"
    >
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "indicators",
  props: {
    active: {
      type: Number,
      default: 0,
    },
    num: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: "white"
    },
    size: {
      type: String,
      default: "1.2vmin"
    },
    activeSize: {
      type: String,
      default: "1.6vmin"
    },
  },
});
</script>
<style scoped lang="less">
.indicators {
  position: absolute;
  display: flex;
  align-items: center;
}
.indicator {
  border-radius: 100%;
  transition: opacity 0.2s, background-color 0.2s, width 0.2s, height 0.2s;
}
.indicator:not(:last-child) {
  margin-right: 1.2vmin;
}
</style>