<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { createProject, getProject } from '@/api/projects'
import { useMediaUpload } from '@/composables/useMediaUpload'
import { useMediaTranscription } from '@/composables/useMediaTranscription'
import BaseInputField from '@/components/ui/BaseInputField.vue'
import BaseTextArea from '@/components/ui/BaseTextArea.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FileDropZone from '@/components/admin/upload/FileDropZone.vue'
import UploadProgressBar from '@/components/admin/upload/UploadProgressBar.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'

const route = useRoute()

const projectId = ref(null)
const projectName = ref('')
const description = ref('')
const selectedFile = ref(null)
const fileError = ref(null)
const hasExistingProject = ref(false)

const upload = useMediaUpload()
const transcription = useMediaTranscription()

onMounted(async () => {
  const qProject = route.query.project
  if (qProject) {
    projectId.value = qProject
    hasExistingProject.value = true
    try {
      const { data } = await getProject(qProject)
      projectName.value = data.name
      description.value = data.description || ''
    } catch {
      // project info is optional for display
    }
  }
})

const isAudioOrVideo = computed(() => {
  if (!selectedFile.value) return false
  const mime = selectedFile.value.type
  return mime.startsWith('video/') || mime.startsWith('audio/')
})

const isBusy = computed(() => upload.isUploading.value || transcription.isProcessing.value)

const canSubmit = computed(() => {
  if (hasExistingProject.value) {
    return selectedFile.value !== null && !isBusy.value
  }
  return projectName.value.trim() !== '' && selectedFile.value !== null && !isBusy.value
})

const activeStatus = computed(() => {
  if (transcription.status.value !== 'idle') return transcription.status.value
  return upload.status.value
})

const activeError = computed(() => transcription.error.value || upload.error.value)

function onFileSelect(file, error) {
  fileError.value = error
  selectedFile.value = file
}

function clearFile() {
  selectedFile.value = null
  fileError.value = null
  upload.reset()
  transcription.reset()
}

async function handleSubmit() {
  if (!canSubmit.value) return

  if (!hasExistingProject.value) {
    try {
      const { data } = await createProject({
        name: projectName.value.trim(),
        description: description.value.trim() || undefined,
      })
      projectId.value = data.id
      hasExistingProject.value = true
    } catch (err) {
      fileError.value = err.response?.data?.detail || 'Error al crear el proyecto'
      return
    }
  }

  await upload.upload(projectId.value, selectedFile.value)
}

async function handleTranscribe() {
  if (!upload.assetId.value || !projectId.value) return
  await transcription.requestTranscription(projectId.value, upload.assetId.value)
}
</script>

<template>
  <div class="flex flex-col flex-1 bg-[var(--color-surface)] px-10 md:px-30 py-10">

    <div class="mb-10">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-[9px] tracking-widest uppercase text-[#2a2a2a] mono">SYS://MEDIA_UPLOAD</span>
        <span v-if="projectId" class="text-[9px] tracking-widest uppercase text-[#2a2a2a] mono">// PROJECT:{{ projectId }}</span>
      </div>
      <h1 class="text-4xl font-light tracking-tight mb-2">Upload Media</h1>
      <p class="text-sm leading-relaxed max-w-md">
        Sube archivos de video o audio. Nuestra IA procesara el contenido
        y generara la transcripcion automaticamente.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 max-w-5xl">

      <!-- Left column -->
      <div class="flex flex-col gap-6">

        <div class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">Nombre del Proyecto</label>
          <BaseInputField
            v-model="projectName"
            placeholder="Atardecer en el Valle"
            :disabled="isBusy || hasExistingProject"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">
            Descripcion <span class="normal-case opacity-40">(Opcional)</span>
          </label>
          <BaseTextArea
            v-model="description"
            placeholder="Detalles sobre el rodaje, lentes o intencion artistica..."
            :disabled="isBusy || hasExistingProject"
          />
        </div>

        <UploadProgressBar
          :status="activeStatus"
          :progress="upload.progress.value"
          :error="activeError"
        />

        <BaseButton
          v-if="upload.status.value !== 'ready'"
          :can-submit="canSubmit"
          title="Subir Archivo"
          :icon="PlayIcon"
          @click="handleSubmit"
        />

        <BaseButton
          v-if="upload.status.value === 'ready' && isAudioOrVideo && transcription.status.value === 'idle'"
          :can-submit="true"
          title="Generar Transcripcion"
          :icon="PlayIcon"
          @click="handleTranscribe"
        />
      </div>

      <!-- Right column -->
      <div class="flex flex-col gap-6">
        <FileDropZone
          :file="selectedFile"
          :disabled="isBusy"
          @select="onFileSelect"
          @clear="clearFile"
        />

        <p v-if="fileError" class="text-xs text-[var(--color-on-error)]">{{ fileError }}</p>

        <!-- Transcription: processing -->
        <div v-if="transcription.isProcessing.value" class="flex items-center gap-3 px-4 py-3 border border-[var(--color-outline)] rounded-sm">
          <svg class="animate-spin h-4 w-4 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" class="opacity-20" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <div class="flex flex-col gap-0.5">
            <span class="text-xs text-[var(--color-on-secondary)]">Procesando transcripcion...</span>
            <span v-if="transcription.provider.value" class="text-[9px] text-[#2a2a2a] mono">Provider: {{ transcription.provider.value }}</span>
          </div>
        </div>

        <!-- Transcription: failed -->
        <div v-if="transcription.status.value === 'failed'" class="flex flex-col gap-3 px-4 py-3 border border-[var(--color-on-error)] border-opacity-30 rounded-sm">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[var(--color-on-error)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span class="text-xs text-[var(--color-on-error)]">{{ transcription.error.value }}</span>
          </div>
          <button
            @click="transcription.retry()"
            class="self-start text-[10px] tracking-widest uppercase text-[var(--color-primary)] border border-[var(--color-outline)] px-4 py-2 hover:border-[var(--color-primary)] transition-colors cursor-pointer"
          >
            Reintentar
          </button>
        </div>

        <!-- Transcription: completed -->
        <div v-if="transcription.status.value === 'ready'" class="flex flex-col gap-6">

          <div class="flex items-center justify-between px-4 py-3 border border-[var(--color-outline)] rounded-sm bg-[var(--color-primary-container)]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span class="text-xs text-[var(--color-primary)] tracking-widest uppercase">Transcripcion completada</span>
            </div>
            <div class="flex items-center gap-4">
              <span v-if="transcription.language.value" class="text-[9px] tracking-widest uppercase text-[#3a3a3a] mono">{{ transcription.language.value }}</span>
              <span v-if="transcription.provider.value" class="text-[9px] tracking-widest uppercase text-[#3a3a3a] mono">{{ transcription.provider.value }}</span>
            </div>
          </div>

          <div v-if="transcription.transcriptSrt.value" class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label class="text-xs tracking-widest uppercase">SRT</label>
              <button
                @click="navigator.clipboard.writeText(transcription.transcriptSrt.value)"
                class="text-[10px] tracking-widest uppercase text-[var(--color-on-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Copiar
              </button>
            </div>
            <pre class="bg-[#0a0a0a] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs p-4 rounded-sm max-h-80 overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed">{{ transcription.transcriptSrt.value }}</pre>
          </div>

          <div v-if="transcription.transcriptText.value" class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label class="text-xs tracking-widest uppercase">Texto Completo</label>
              <button
                @click="navigator.clipboard.writeText(transcription.transcriptText.value)"
                class="text-[10px] tracking-widest uppercase text-[var(--color-on-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Copiar
              </button>
            </div>
            <pre class="bg-[#0a0a0a] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs p-4 rounded-sm max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">{{ transcription.transcriptText.value }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
