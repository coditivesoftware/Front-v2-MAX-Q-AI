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
  const error = ref(null)

  let pollTimer = null

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  async function poll(projectId, assetId) {
    try {
      const { data } = await getTranscription(projectId, assetId)

      if (data.status === 'completed') {
        stopPolling()
        transcriptText.value = data.transcript_text
        transcriptSrt.value = data.transcript_srt
        status.value = 'ready'
      } else if (data.status === 'failed') {
        stopPolling()
        error.value = data.error_message || 'La transcripcion fallo'
        status.value = 'failed'
      }
    } catch (err) {
      stopPolling()
      error.value = err.response?.data?.detail || err.message || 'Error al consultar transcripcion'
      status.value = 'failed'
    }
  }

  async function requestTranscription(projectId, assetId) {
    status.value = 'processing'
    error.value = null
    transcriptText.value = null
    transcriptSrt.value = null

    try {
      const { data } = await apiRequestTranscription(projectId, assetId)

      if (data.reused && data.status === 'completed') {
        status.value = 'ready'
        const result = await getTranscription(projectId, assetId)
        transcriptText.value = result.data.transcript_text
        transcriptSrt.value = result.data.transcript_srt
        return
      }

      pollTimer = setInterval(() => poll(projectId, assetId), POLL_INTERVAL)
    } catch (err) {
      error.value = err.response?.data?.detail || err.message || 'Error al iniciar transcripcion'
      status.value = 'failed'
    }
  }

  function reset() {
    stopPolling()
    status.value = 'idle'
    transcriptText.value = null
    transcriptSrt.value = null
    error.value = null
  }

  onUnmounted(stopPolling)

  return {
    status: readonly(status),
    transcriptText: readonly(transcriptText),
    transcriptSrt: readonly(transcriptSrt),
    error: readonly(error),
    isProcessing: computed(() => status.value === 'processing'),
    requestTranscription,
    stopPolling,
    reset,
  }
}
