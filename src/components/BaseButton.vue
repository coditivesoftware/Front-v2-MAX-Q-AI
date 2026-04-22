<script setup>
const props = defineProps({
    canSubmit:Boolean,
    title:String,
    icon:Object
})
const emit = defineEmits(['click'])
</script>
<template>
       <button
  @click="emit('click')"
  :disabled="!canSubmit"
  class="mt-2 flex items-center justify-center gap-3 px-9 py-[11px] bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[13px] font-medium rounded-sm tracking-widest uppercase transition-all duration-150
    hover:opacity-80
    hover:cursor-pointer
    disabled:opacity-30 disabled:cursor-default disabled:hover:opacity-30"
>
  <span>{{ title }}</span>
  <component :is="icon" />
</button>
</template>