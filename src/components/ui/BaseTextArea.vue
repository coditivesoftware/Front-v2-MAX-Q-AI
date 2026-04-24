<script setup>
const props = defineProps({
    placeholder:String,
    disabled:Boolean
})

const description = defineModel()
</script>
<template>
      <textarea
              v-model="description"
              :placeholder="placeholder"
              rows="4"
              :disabled="disabled"
              class="bg-[var(--color-secondary)] border border-[var(--color-outline)] text-[var(--color-primary)] placeholder-[var(--color-outline)] placeholder-opacity-30 text-sm px-4 py-3 rounded-sm outline-none focus:border-[var(--color-primary)] transition-colors duration-200 resize-none disabled:opacity-40"
            />
</template>

