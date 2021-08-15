<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { useSettingStore } from '~/stores/setting'

export default defineComponent({
  name: 'App',
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  setup() {
    const setting = useSettingStore()
  }
})
</script>