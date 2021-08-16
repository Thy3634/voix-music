<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="$emit('update:open', false)">
            <div class="absolute inset-0 overflow-hidden">
                <TransitionChild
                    as="template"
                    enter="ease-in-out duration-500"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in-out duration-500"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                </TransitionChild>
                <div class="fixed inset-x-0 bottom-0 pt-10 max-w-full flex">
                    <TransitionChild
                        as="template"
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="translate-y-full"
                        enter-to="translate-y-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leave-from="translate-y-0"
                        leave-to="translate-y-full"
                    >
                        <div class="relative w-screen max-w-md">
                            <div
                                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
                            >
                                <div class="px-4 sm:px-6">
                                    <DialogTitle
                                        class="text-lg font-medium text-gray-900"
                                    >Panel title</DialogTitle>
                                </div>
                                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                                    <slot></slot>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
  <script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    emits: ['update:open'],
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
}
</script>