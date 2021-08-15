<template>
  <span class="inline-block text-black bg-theme rounded-full font-extrabold" :class="sizeClass">
    <slot></slot>
  </span>
</template>
<script lang='ts'>
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Tag",
  props: {
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
      default: 'md',
    },
  },
  setup(props) {
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'xs':
          return "text-xs py-0.5 px-1"
        case 'sm':
          return "text-sm py-1 px-2"
        case 'md':
          return "text-base py-1.5 px-3"
        case 'lg':
          return "text-lg py-2 px-4"
        case 'xl':
          return "text-xl py-2.5 px-5"
        default:
          return "text-base py-1.5 px-3"
      }
    })
    return {
      sizeClass
    }
  }
});
</script>