<script setup>
import { ref, computed } from 'vue'
import { createProject } from '@/api/projects'
import { useMediaUpload } from '@/composables/useMediaUpload'
import { useMediaTranscription } from '@/composables/useMediaTranscription'
import BaseInputField from '@/components/ui/BaseInputField.vue'
import BaseTextArea from '@/components/ui/BaseTextArea.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FileDropZone from '@/components/admin/upload/FileDropZone.vue'
import UploadProgressBar from '@/components/admin/upload/UploadProgressBar.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'

const projectName = ref('')
const description = ref('')
const selectedFile = ref(null)
const fileError = ref(null)
const projectId = ref(null)

const upload = useMediaUpload()
const transcription = useMediaTranscription()

const isAudioOrVideo = computed(() => {
  if (!selectedFile.value) return false
  const mime = selectedFile.value.type
  return mime.startsWith('video/') || mime.startsWith('audio/')
})

const isBusy = computed(() => upload.isUploading.value || transcription.isProcessing.value)

const canSubmit = computed(
  () => projectName.value.trim() !== '' && selectedFile.value !== null && !isBusy.value
)

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
  projectId.value = null
}

async function handleSubmit() {
  if (!canSubmit.value) return

  try {
    const { data } = await createProject({
      name: projectName.value.trim(),
      description: description.value.trim() || undefined,
    })
    projectId.value = data.id
  } catch (err) {
    upload.reset()
    fileError.value = err.response?.data?.detail || 'Error al crear el proyecto'
    return
  }

  await upload.upload(projectId.value, selectedFile.value)
}

async function handleTranscribe() {
  if (!upload.assetId.value || !projectId.value) return
  await transcription.requestTranscription(projectId.value, upload.assetId.value)
}
</script>

<template>
  <div class="flex flex-col flex-1 bg-[var(--color-surface)] px-30 py-10">

    <div class="mb-10">
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
          <BaseInputField v-model="projectName" placeholder="Atardecer en el Valle" :disabled="isBusy" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">
            Descripcion <span class="normal-case opacity-40">(Opcional)</span>
          </label>
          <BaseTextArea v-model="description" placeholder="Detalles sobre el rodaje, lentes o intencion artistica..." :disabled="isBusy" />
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
          :can-submit="!transcription.isProcessing.value"
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

        <div v-if="transcription.transcriptSrt.value" class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">Transcripcion SRT</label>
          <pre class="bg-[var(--color-secondary)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs p-4 rounded-sm max-h-80 overflow-y-auto whitespace-pre-wrap">{{ transcription.transcriptSrt.value }}</pre>
        </div>

        <div v-if="transcription.transcriptText.value" class="flex flex-col gap-2">
          <label class="text-xs tracking-widest uppercase">Texto</label>
          <pre class="bg-[var(--color-secondary)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs p-4 rounded-sm max-h-60 overflow-y-auto whitespace-pre-wrap">{{ transcription.transcriptText.value }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
