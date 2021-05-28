<template>
  <div class="logo">
    <embed
      :src="src"
      type="image/svg+xml"
    />
    <span>
      <p>VOIX</p>
      <p>MUSIC</p>
    </span>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from "vue";
import { useSettingStore } from "~/stores/setting";
export default defineComponent({
  name: "logo",
  setup() {
    const settingStore = useSettingStore()
    const src = computed(() => {
      return "src/assets/logo-" + settingStore.theme + ".svg"
    })
    return {
      src
    }
  }
});
</script>
<style scoped lang="less">
.logo {
  embed {
    height: 100%;
    margin: 0 2vw;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    color: var(--text-color);
    p {
      font-weight: bolder;
      line-height: 0.9em;
      letter-spacing: -0.1em;
    }
  }
}
</style>