<template>
  <van-tag
    round
    color="var(--theme-color)"
    text-color="black"
  >
    <slot></slot>
  </van-tag>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { Tag } from 'vant';

export default defineComponent({
  name: "tag",
  components: { [Tag.name]: Tag }
});
</script>
<style scoped lang="less">
.van-tag {
  font-size: 0.6em;
  font-weight: bold;
  padding: 2vmin 4vmin;
}
</style>