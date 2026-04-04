<script setup>
import { ref } from 'vue'

const selected = ref('free')
const prompt = ref('')

function select(type) {
  selected.value = type
}

function continuar() {
  if (!selected.value) return
  console.log('Continuing with:', selected.value, prompt.value)
}
</script>

<template>
  <main class="flex-1 flex items-start justify-center px-6 pt-[72px] pb-12">
    <div class="w-full max-w-[780px] flex flex-col gap-8">

      <!-- Header -->
      <div class="flex flex-col gap-2.5">
        <h1 class="font-[Georgia,_'Times_New_Roman',_serif] text-[clamp(28px,4vw,40px)] font-normal tracking-[-0.01em] leading-[1.15]">
          Select Search Type
        </h1>
        <p class="text-[14px] leading-relaxed max-w-[520px]">
          Define the type of sequences or scenes you want to find from your footage.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-2 gap-3">

        <!-- Core Story -->
     

        <!-- Free Search -->
        <button
          class="relative flex flex-col gap-3.5 p-7 text-left rounded-sm border min-h-[160px] transition-all duration-[180ms]"
          :class="selected === 'free'
            ? 'bg-[var(--color-primary-container)] border-[var(--color-primary)]'
            : 'bg-[var(--color-error-container)] border-[var(--color-outline)] hover:border-[var(--color-on-secondary)]'"
          @click="select('free')"
        >
          <div class="w-7 h-7 opacity-60 text-[var(--color-primary)]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4l1.8 5.5H22l-4.9 3.6 1.9 5.5L14 15.1l-5 3.5 1.9-5.5L6 9.5h6.2L14 4z" fill="currentColor" fill-opacity="0.9"/>
              <circle cx="22" cy="6" r="2" fill="currentColor" fill-opacity="0.6"/>
              <circle cx="6" cy="22" r="1.5" fill="currentColor" fill-opacity="0.4"/>
            </svg>
          </div>
          <div class="flex flex-col gap-1.5">
            <h2 class="text-[16px] font-medium mb-1">Free Search</h2>
            <p class="text-[13px] leading-relaxed">Describe the mood or specific characters you want to find with a prompt</p>
          </div>
          <div v-if="selected === 'free'" class="absolute top-3.5 right-3.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="var(--color-primary)"/>
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--color-on-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- Prompt box -->
      <Transition name="prompt">
        <div
          v-if="selected === 'free'"
          class="bg-[var(--color-error-container)] border border-[var(--color-outline)] rounded-sm px-5 pt-5 pb-3.5 flex flex-col gap-4"
        >
          <div class="w-[18px] h-[18px] shrink-0 text-[var(--color-on-secondary)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14l2-5L13 1l4 4-8 8-6 1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M11 3l4 4" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </div>
          <textarea
            class="bg-transparent border-none w-full text-[13px] text-[var(--color-primary)] leading-[1.65] min-h-[60px] outline-none resize-none placeholder:text-[var(--color-outline)]"
            v-model="prompt"
            placeholder="Describe las escenas que buscas... Ej: 'Un primer plano de un rostro iluminado por neones parpadeantes en una calle lluviosa'."
            rows="3"
          />
          <div class="flex gap-5 border-t border-[var(--color-outline)] pt-3">
            <button class="flex items-center gap-1.5 text-[12px] text-[var(--color-on-secondary)] tracking-widest uppercase transition-colors duration-150 hover:text-[var(--color-primary)]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="opacity-70">
                <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
              Adjuntar Referencia
            </button>
            <button class="flex items-center gap-1.5 text-[12px] text-[var(--color-on-secondary)] tracking-widest uppercase transition-colors duration-150 hover:text-[var(--color-primary)]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="opacity-70">
                <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.3"/>
                <path d="M7.5 5v3l2 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
              Recientes
            </button>
          </div>
        </div>
      </Transition>

      <!-- CTA -->
      <div class="flex justify-end">
        <button
          class="px-9 py-[11px] bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[13px] font-medium rounded-sm tracking-widest uppercase transition-all duration-150 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="!selected"
          @click="continuar"
        >
          Continuar
        </button>
      </div>

    </div>
  </main>
</template>

<style scoped>
.prompt-enter-active,
.prompt-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>