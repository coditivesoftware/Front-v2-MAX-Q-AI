<script setup>
const props = defineProps({
    canSubmit:Boolean,
    title:String
})
const emit = defineEmits(['click'])
</script>
<template>
       <button
            @click="emit('click')"
            :disabled="!canSubmit"
            class="mt-2 flex items-center justify-center gap-3 px-6 py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-200
              bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] border border-[var(--color-outline)]
              hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:border-[var(--color-primary)]
              disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-primary-container)] disabled:hover:text-[var(--color-on-primary-container)] disabled:hover:border-[var(--color-outline)]"
          >
            <span>{{ title }}</span>
            <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </button>
</template>