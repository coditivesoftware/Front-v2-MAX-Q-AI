<script setup>
import { ref } from 'vue'

const props = defineProps({
  file: Object,
  accept: { type: String, default: '.mp4,.mov,.mxf,.mp3,.wav,.aac,.flac' },
  disabled: Boolean,
})

const emit = defineEmits(['select', 'clear'])

const isDragging = ref(false)
const fileInput = ref(null)

const ACCEPTED_EXTENSIONS = props.accept.split(',').map((e) => e.trim().toLowerCase())

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function validateFile(file) {
  const ext = '.' + file.name.split('.').pop().toLowerCase()
  return ACCEPTED_EXTENSIONS.includes(ext)
}

function handleFile(file) {
  if (!file || props.disabled) return
  if (!validateFile(file)) {
    emit('select', null, `Formato no compatible. Usa ${ACCEPTED_EXTENSIONS.join(', ')}`)
    return
  }
  emit('select', file, null)
}

function onDrop(e) {
  isDragging.value = false
  handleFile(e.dataTransfer.files[0])
}

function onInputChange(e) {
  handleFile(e.target.files[0])
  e.target.value = ''
}

function openPicker() {
  if (!props.disabled) fileInput.value?.click()
}
</script>

<template>
  <div
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="openPicker"
    :class="[
      'relative flex flex-col items-center justify-center border rounded-sm cursor-pointer transition-all duration-300 min-h-72',
      isDragging
        ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)]'
        : file
          ? 'border-[var(--color-primary)] border-opacity-50 bg-[var(--color-primary-container)]'
          : 'border-dashed border-[var(--color-outline)] bg-[var(--color-error-container)] hover:border-[var(--color-on-secondary)]',
      disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="hidden"
      @change="onInputChange"
      :disabled="disabled"
    />

    <template v-if="file">
      <div class="flex flex-col items-center gap-4 px-8 text-center">
        <div class="w-12 h-12 flex items-center justify-center border border-[var(--color-outline)] rounded-sm">
          <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-[var(--color-primary)] font-medium truncate max-w-xs">{{ file.name }}</p>
          <p class="text-xs text-[var(--color-on-secondary)] mt-1">{{ formatFileSize(file.size) }}</p>
        </div>
        <button
          @click.stop="emit('clear')"
          class="text-xs tracking-widest uppercase text-[var(--color-on-secondary)] opacity-50 hover:opacity-100 transition-opacity"
        >
          Cambiar archivo
        </button>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col items-center gap-5 px-8 text-center">
        <div class="w-14 h-14 flex items-center justify-center border border-[var(--color-outline)] rounded-sm">
          <svg class="w-6 h-6 text-[var(--color-primary)] opacity-60" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-[var(--color-primary)]">Arrastra tu archivo aqui o selecciona</p>
          <p class="text-xs text-[var(--color-on-secondary)] mt-1.5 opacity-60">Video: .MP4, .MOV, .MXF — Audio: .MP3, .WAV, .AAC, .FLAC</p>
        </div>
        <div class="flex gap-2">
          <span class="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[var(--color-outline)] text-[var(--color-on-secondary)] opacity-50">Video + Audio</span>
          <span class="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[var(--color-outline)] text-[var(--color-on-secondary)] opacity-50">4K Ready</span>
        </div>
      </div>
    </template>
  </div>
</template>
