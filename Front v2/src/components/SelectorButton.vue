<script setup>

</script>
<template>
       <button
          class="relative flex flex-col gap-3.5 p-7 text-left rounded-sm border min-h-[160px] transition-all duration-[180ms]"
          :class="selected === 'core'
            ? 'bg-[var(--color-primary-container)] border-[var(--color-primary)]'
            : 'bg-[var(--color-error-container)] border-[var(--color-outline)] hover:border-[var(--color-on-secondary)]'"
          @click="select('core')"
        >
          <div class="w-7 h-7 opacity-60 text-[var(--color-primary)]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="4" width="8" height="8" rx="1" fill="currentColor" fill-opacity="0.9"/>
              <rect x="16" y="4" width="8" height="8" rx="1" fill="currentColor" fill-opacity="0.4"/>
              <rect x="4" y="16" width="8" height="8" rx="1" fill="currentColor" fill-opacity="0.4"/>
              <rect x="16" y="16" width="8" height="8" rx="1" fill="currentColor" fill-opacity="0.9"/>
            </svg>
          </div>
          <div class="flex flex-col gap-1.5">
            <h2 class="text-[16px] font-medium mb-1">Core Story</h2>
            <p class="text-[13px] leading-relaxed">Find the sequences that best deliver the core story of your film.</p>
          </div>
          <div v-if="selected === 'core'" class="absolute top-3.5 right-3.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="var(--color-primary)"/>
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--color-on-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
</template>