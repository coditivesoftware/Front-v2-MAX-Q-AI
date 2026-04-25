import { ref, computed, readonly, onUnmounted } from 'vue'
import {
  requestTranscription as apiRequestTranscription,
  getTranscription,
} from '@/api/media'

const POLL_INTERVAL = 3000

export function useMediaTranscription() {
  const status = ref('idle')
  const transcriptText = ref(null)
  const transcriptSrt = ref(null)
  const language = ref(null)
  const provider = ref(null)
  const completedAt = ref(null)
  const error = ref(null)

  let pollTimer = null
  let lastProjectId = null
  let lastAssetId = null

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  function setCompleted(data) {
    stopPolling()
    transcriptText.value = data.transcript_text
    transcriptSrt.value = data.transcript_srt
    language.value = data.language
    provider.value = data.provider
    completedAt.value = data.completed_at
    status.value = 'ready'
  }

  async function poll(projectId, assetId) {
    try {
      const { data } = await getTranscription(projectId, assetId)

      if (data.status === 'completed') {
        setCompleted(data)
      } else if (data.status === 'failed') {
        stopPolling()
        error.value = data.error_message || 'La transcripcion fallo'
        status.value = 'failed'
      }
    } catch (err) {
      if (err.response?.status === 404) return
      stopPolling()
      error.value = err.response?.data?.detail || err.message || 'Error al consultar transcripcion'
      status.value = 'failed'
    }
  }

  async function requestTranscription(projectId, assetId) {
    lastProjectId = projectId
    lastAssetId = assetId
    status.value = 'processing'
    error.value = null
    transcriptText.value = null
    transcriptSrt.value = null
    language.value = null
    provider.value = null
    completedAt.value = null

    try {
      const { data } = await apiRequestTranscription(projectId, assetId)
      provider.value = data.provider

      if (data.reused && data.status === 'completed') {
        const result = await getTranscription(projectId, assetId)
        setCompleted(result.data)
        return
      }

      pollTimer = setInterval(() => poll(projectId, assetId), POLL_INTERVAL)
    } catch (err) {
      const resp = err.response
      if (resp?.status === 409) {
        error.value = 'El asset aun no esta listo. Espera a que termine la subida.'
      } else if (resp?.status === 400) {
        error.value = resp.data?.detail || 'El archivo no es audio ni video.'
      } else {
        error.value = resp?.data?.detail || err.message || 'Error al iniciar transcripcion'
      }
      status.value = 'failed'
    }
  }

  async function retry() {
    if (!lastProjectId || !lastAssetId) return
    await requestTranscription(lastProjectId, lastAssetId)
  }

  function reset() {
    stopPolling()
    status.value = 'idle'
    transcriptText.value = null
    transcriptSrt.value = null
    language.value = null
    provider.value = null
    completedAt.value = null
    error.value = null
    lastProjectId = null
    lastAssetId = null
  }

  onUnmounted(stopPolling)

  return {
    status: readonly(status),
    transcriptText: readonly(transcriptText),
    transcriptSrt: readonly(transcriptSrt),
    language: readonly(language),
    provider: readonly(provider),
    completedAt: readonly(completedAt),
    error: readonly(error),
    isProcessing: computed(() => status.value === 'processing'),
    requestTranscription,
    retry,
    stopPolling,
    reset,
  }
}
