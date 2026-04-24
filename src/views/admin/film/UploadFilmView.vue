<script setup>
import { ref, computed } from 'vue'
import BaseInputField from '@/components/ui/BaseInputField.vue'
import BaseTextArea from '@/components/ui/BaseTextArea.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

import PlayIcon from '@/components/icons/PlayIcon.vue'

const projectName = ref('')
const description = ref('')
const selectedFile = ref(null)
const isDragging = ref(false)
const uploadProgress = ref(0)
const statusMessage = ref('')
const hasError = ref(false)
const isProcessing = ref(false) //locks the text data inputs when the video processing is started

const router = useRouter()

const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
const ACCEPTED_EXTENSIONS = ['.mp4', '.mov', '.mxf']

const canSubmit = computed(() =>
  projectName.value.trim() !== '' && selectedFile.value !== null && !isProcessing.value
)

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function validateFile(file) {
  const ext = '.' + file.name.split('.').pop().toLowerCase()
  return ACCEPTED_EXTENSIONS.includes(ext)
}

function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file) setFile(file)
}

function handleDrop(e) {
  isDragging.value = false
  if (isProcessing.value) return
  const file = e.dataTransfer.files[0]
  if (file) setFile(file)
}

function setFile(file) {
  if (!validateFile(file)) {
    hasError.value = true
    statusMessage.value = 'Formato no compatible. Usa .MP4, .MOV o .MXF.'
    return
  }
  hasError.value = false
  statusMessage.value = ''
  selectedFile.value = file
}

function clearFile() {
  selectedFile.value = null
  uploadProgress.value = 0
  statusMessage.value = ''
  hasError.value = false
}

async function handleSubmit() {
  if (!canSubmit.value) return
  isProcessing.value = true
  hasError.value = false
  statusMessage.value = 'Iniciando carga...'

  // Simulated upload progress — replace with real API call
  const interval = setInterval(() => {
    if (uploadProgress.value < 90) {
      uploadProgress.value += Math.floor(Math.random() * 12) + 3
      statusMessage.value = `Subiendo archivo... ${uploadProgress.value}%`
    }
  }, 300)

  try {
    // TODO: replace with real upload logic
    await new Promise(resolve => setTimeout(resolve, 3500))
    clearInterval(interval)
    uploadProgress.value = 100
    statusMessage.value = 'Archivo recibido. Procesamiento iniciado.'
    router.push({ name: 'admin-search' })
    // router.push(`/projects/${newProjectId}`)
  } catch (err) {
    clearInterval(interval)
    hasError.value = true
    statusMessage.value = 'Error al subir el archivo. Intenta de nuevo.'
    isProcessing.value = false
  }
}
</script>


<template>
    <div class="flex flex-col flex-1 bg-[var(--color-surface)] px-30 py-10">
  
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-light tracking-tight mb-2">Upload Film</h1>
        <p class="text-sm leading-relaxed max-w-md">
          Inicia el análisis cinemático de tu archivo. Nuestra IA procesará cada frame para
          identificar escenas, iluminación y metadatos técnicos.
        </p>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 max-w-5xl">
  
        <!-- Left column: metadata -->
        <div class="flex flex-col gap-6">
  
          <!-- CMP-02: MetadataInputField — Nombre -->
          <div class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">Nombre del Proyecto</label>
           <BaseInputField v-model="projectName" placeholder="Atardecer en el Valle" :disabled="isProcessing"/>
          </div>
      
  
          <!-- CMP-02: MetadataInputField — Descripción -->
          <div class="flex flex-col gap-2">
            <label class="text-xs tracking-widest uppercase">Descripción <span class="normal-case opacity-40">(Opcional)</span></label>
        
            <BaseTextArea v-model="description" placeholder="Detalles sobre el rodaje, lentes o intención artística... " :disabled="isProcessing"/>
          </div>
  
          <!-- CMP-03: UploadProgressBar -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label class="text-xs tracking-widest uppercase">Estado del Procesamiento</label>
              <span class="text-xs text-[var(--color-on-secondary)] opacity-50">
                {{ uploadProgress > 0 ? `${uploadProgress}%` : 'Esperando archivo...' }}
              </span>
            </div>
            <div class="h-px w-full bg-[var(--color-outline)]">
              <div
                class="h-px bg-[var(--color-primary)] transition-all duration-500 ease-out"
                :style="{ width: `${uploadProgress}%` }"
              />
            </div>
            <p v-if="statusMessage" class="text-xs" :class="hasError ? 'text-[var(--color-on-error)]' : 'text-[var(--color-on-secondary)]'">
              {{ statusMessage }}
            </p>
          </div>
  
          <!-- CMP-04: PrimaryButton -->
       <BaseButton :can-submit="canSubmit" title="Comenzar Procesamiento" :icon="PlayIcon" @click="handleSubmit"></BaseButton>
  
        </div>
  
        <!-- Right column: CMP-01 FileUploadZone -->
        <div
          @dragenter.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="!isProcessing && $refs.fileInput.click()"
          :class="[
            'relative flex flex-col items-center justify-center border rounded-sm cursor-pointer transition-all duration-300 min-h-72',
            isDragging
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-container)]'
              : selectedFile
                ? 'border-[var(--color-primary)] border-opacity-50 bg-[var(--color-primary-container)]'
                : 'border-dashed border-[var(--color-outline)] bg-[var(--color-error-container)] hover:border-[var(--color-on-secondary)]',
            isProcessing ? 'cursor-not-allowed opacity-60' : ''
          ]"
        >
          <input
            ref="fileInput"
            type="file"
            accept=".mp4,.mov,.mxf"
            class="hidden"
            @change="handleFileSelect"
            :disabled="isProcessing"
          />
  
          <!-- File selected state -->
          <template v-if="selectedFile">
            <div class="flex flex-col items-center gap-4 px-8 text-center">
              <div class="w-12 h-12 flex items-center justify-center border border-[var(--color-outline)] rounded-sm">
                <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m3.375 4.651 4.773-2.197a2.25 2.25 0 0 1 1.352-.238l4.826.806a2.25 2.25 0 0 0 1.352-.238l4.773-2.197A1.125 1.125 0 0 1 21.75 1.8v14.4a1.125 1.125 0 0 1-.698 1.04l-4.773 2.197a2.25 2.25 0 0 1-1.352.238l-4.826-.806a2.25 2.25 0 0 0-1.352.238L4.024 21.24A1.125 1.125 0 0 1 2.25 20.2V5.8a1.125 1.125 0 0 1 .698-1.04z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-[var(--color-primary)] font-medium truncate max-w-xs">{{ selectedFile.name }}</p>
                <p class="text-xs text-[var(--color-on-secondary)] mt-1">{{ formatFileSize(selectedFile.size) }}</p>
              </div>
              <button
                @click.stop="clearFile"
                class="text-xs tracking-widest uppercase text-[var(--color-on-secondary)] opacity-50 hover:opacity-100 transition-opacity"
              >
                Cambiar archivo
              </button>
            </div>
          </template>
  
          <!-- Empty state -->
          <template v-else>
            <div class="flex flex-col items-center gap-5 px-8 text-center">
              <div class="w-14 h-14 flex items-center justify-center border border-[var(--color-outline)] rounded-sm">
                <svg class="w-6 h-6 text-[var(--color-primary)] opacity-60" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-[var(--color-primary)]">Arrastra tu film aquí o selecciona archivo</p>
                <p class="text-xs text-[var(--color-on-secondary)] mt-1.5 opacity-60">Formatos compatibles: .MP4, .MOV, .MXF (ProRes/H.265)</p>
              </div>
              <div class="flex gap-2">
                <span class="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[var(--color-outline)] text-[var(--color-on-secondary)] opacity-50">MAX 500MB+</span>
                <span class="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[var(--color-outline)] text-[var(--color-on-secondary)] opacity-50">4K Ready</span>
              </div>
            </div>
          </template>
        </div>
  
      </div>
    </div>
  </template>
  
