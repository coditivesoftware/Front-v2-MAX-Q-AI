<script setup>
const props = defineProps({
title:String,
icon:Object,
description:String,
selected:String,
clickId:String
})

const emit = defineEmits(['onClick'])

</script>
<template>
       <button
          class="relative flex flex-col gap-3.5 p-7 text-left rounded-sm border min-h-[160px] transition-all duration-[180ms]"
          :class="selected === clickId
            ? 'bg-[var(--color-primary-container)] border-[var(--color-primary)] hover:cursor-default'
            : 'bg-[var(--color-error-container)] border-[var(--color-outline)] hover:border-[var(--color-on-secondary)]  hover:cursor-pointer'"
          @click="emit('onClick')"
        >
          <div class="w-7 h-7 opacity-60 text-[var(--color-primary)]">
            <component :is="icon"></component>
          </div>
          <div class="flex flex-col gap-1.5">
            <h2 class="text-[16px] font-medium mb-1">{{ title }}</h2> <!-- Core Story -->
            <p class="text-[13px] leading-relaxed">{{ description }}</p>
          </div>
          <div v-if="selected === clickId" class="absolute top-3.5 right-3.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="var(--color-primary)"/>
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--color-on-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
</template>