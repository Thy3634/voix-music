<template>
    <div
        class="h-10 mt-2 px-2 rounded flex flex-row ring-yellow-300 focus-within:ring-1 items-center bg-white dark:bg-gray-800 cursor-text"
        @focus="input.focus()"
    >
        <slot name="left"></slot>
        <span class="flex flex-col-reverse w-full relative bg-inherit">
            <input
                ref="input"
                :type="type"
                :value="value"
                :name="name"
                @input="updateValue"
                :required="required"
                :autocomplete="autocomplete"
                :maxlength="maxlength"
                :minlength="minlength"
                :autofocus="autofocus"
                :disabled="disabled"
                class="input bg-transparent h-8 w-full outline-none z-20 placeholder-current placeholder-opacity-0 focus:placeholder-opacity-60"
            />
            <label
                :for="name"
                class="label absolute left-0 px-1 top-1/2 rounded-sm transition transform -translate-y-1/2 z-10 bg-inherit"
            >
                <slot name="label">{{ name }}</slot>
            </label>
        </span>
        <slot name="right"></slot>
    </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
    name: "MaterialInput",
    props: {
        value: {
            type: String,
            default: ''
        },
        type: String as PropType<'text' | 'url' | 'email' | 'tel' | 'password' | 'number' | 'search'>,
        name: String,
        required: Boolean,
        autocomplete: String as PropType<'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific=suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'ccexp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'url' | 'photo'>,
        maxlength: Number,
        minlength: Number,
        autofocus: Boolean,
        disabled: Boolean
    },
    emits: ['update:value'],
    setup(props, { emit }) {
        const updateValue = (event: Event) => emit('update:value', (event.target as HTMLInputElement).value)
        const input = ref(null as unknown as HTMLInputElement)
        return {
            updateValue,
            input
        }
    }
});
</script>
<style scoped>
.label {
    transition-property: top, font-size, transform;
}
.input:valid + .label {
    @apply text-xs -top-1;
}
.input:focus + .label {
    @apply text-xs -top-1;
}
</style>