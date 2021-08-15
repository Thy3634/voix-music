<template>
  <div class="flex items-center">
    <component :is="Logo" class="inline-block h-12 w-16 mx-2"></component>
    <span class="inline-block font-black leading-4 tracking-tight">
      <p>VOIX</p>
      <p>MUSIC</p>
    </span>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from "vue";
import { useSettingStore } from "~/stores/setting";

import LightLogo from "!/logo/light.svg?component";
import DarkLogo from "!/logo/dark.svg?component";

export default defineComponent({
  name: "LogoText",
  setup() {
    const setting = useSettingStore()
    const Logo = computed(() => setting.scheme == 'dark' ? DarkLogo : LightLogo)
    return {
      Logo
    }
  }
});
</script>