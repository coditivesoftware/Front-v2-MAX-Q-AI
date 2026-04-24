<script setup>
import BaseSecondaryButton from '@/components/ui/BaseSecondaryButton.vue'

import ClockIcon from '@/components/icons/ClockIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const promptModel = defineModel()

function handleRecent(){
console.log("Handling recent")
}

function handleAttach(){
  console.log("Handling attach")
}

</script>

<template>
       <div
          class="bg-[var(--color-secondary)] border border-[var(--color-outline)] rounded-sm px-5 pt-5 pb-3.5 flex flex-col gap-4"
        >
          <div class="w-[18px] h-[18px] shrink-0 text-[var(--color-on-secondary)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14l2-5L13 1l4 4-8 8-6 1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M11 3l4 4" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </div>
          <textarea
            class="bg-transparent border-none w-full text-[13px] text-[var(--color-primary)] leading-[1.65] min-h-[60px] outline-none resize-none placeholder:text-[var(--color-outline)]"
            v-model="promptModel"
            placeholder="Describe las escenas que buscas... Ej: 'Un primer plano de un rostro iluminado por neones parpadeantes en una calle lluviosa'."
            rows="3"
          />

          <div class="flex gap-5 border-t border-[var(--color-outline)] pt-3">
            
            <BaseSecondaryButton label="Adjuntar Referencia" :icon="PlusIcon" @click="handleAttach"></BaseSecondaryButton>
            <BaseSecondaryButton label="Recientes" :icon="ClockIcon"  @click="handleRecent"></BaseSecondaryButton>

          </div>
        </div>
</template>