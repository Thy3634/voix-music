<template>
  <span class="w-8 h-8">
    <img
      v-if="!error"
      :src="src"
      :alt="alt"
      :onerror="error = true"
      class="inline-block w-full h-full object-cover rounded-full"
    />
    <UserCircleIcon v-else class="text-gray-400 w-full h-full"></UserCircleIcon>
  </span>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";

import UserCircleIcon from "!/icons/solid/user-circle.svg?component";

export default defineComponent({
  name: "Avatar",
  components: {
    UserCircleIcon
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: String
  },
  setup() {
    const error = ref(false)
    return {
      error
    }
  }
});
</script>