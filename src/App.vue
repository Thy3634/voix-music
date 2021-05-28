<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSettingStore } from "~/stores/setting";

export default defineComponent({
  name: 'App',
  setup() {
    const settingStore = useSettingStore()
    settingStore.initTheme()
  }
})
</script>

<style lang="less">
:root {
  p {
    margin: 0;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  --theme-color: #ffe131;
}
#app[data-theme="dark"] {
  --text-color: white;
  --second-text-color: #636363;
  --background-color: black;
  --second-background-color: #1a1a1a;
  --foreground-color: #d1d1d1;
  --second-foreground-color: #4a4a4a;
}
#app[data-theme="light"] {
  --text-color: black;
  --second-text-color: #777777;
  --background-color: white;
  --second-background-color: #ededed;
  --foreground-color: white;
  --second-foreground-color: #d1d1d1;
}
</style>
