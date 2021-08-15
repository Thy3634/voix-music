<template>
  <div class="w-8 h-8">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="inline-block w-full h-full object-cover rounded-full"
    />
    <UserCircleIcon v-else class="text-gray-400 w-full h-full"></UserCircleIcon>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";

import UserCircleIcon from "!/icons/solid/user-circle.svg?component";

export default defineComponent({
  name: "Avatar",
  components: {
    UserCircleIcon
  },
  props: {
    src: String,
    alt: String
  }
});
</script>