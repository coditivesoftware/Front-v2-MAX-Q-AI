<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon:Object
})
 
defineEmits(['click'])
</script>
 
<template>
  <button
    class="flex items-center gap-1.5 text-[12px] text-[var(--color-on-secondary)] hover:cursor-pointer tracking-widest uppercase transition-colors duration-150 hover:text-[var(--color-primary)]"
    @click="$emit('click')"
  >
  <component :is="icon" />
    {{ label }}
  </button>
</template>
 