<template>
  <span>
    <van-icon
      class-prefix="iconfont"
      name="quote-left"
    />
    <p>
      <slot name="default"></slot>
      <van-icon
        class-prefix="iconfont"
        name="quote-right"
      />
    </p>
    <span class="from">
      <slot name="from"></slot>
    </span>
  </span>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { Icon } from "vant";

export default defineComponent({
  name: "quote",
  components: {
    [Icon.name]: Icon,
  }
});
</script>
<style scoped lang="less">
span {
  .iconfont-quote-left {
    display: block;
  }
  p {
    margin: 0;
    line-height: 1.5em;
    letter-spacing: 0.1em;
    i {
      transform: translate(0, 1vh);
    }
  }
  .from {
    display: block;
    text-align: right;
    margin: 4vh 0 0 0;
  }
}
</style>