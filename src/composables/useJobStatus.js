import { ref, computed, watchEffect } from 'vue'

export function useJobStatus(jobId) {
  const status = ref('pending') // 'pending' | 'processing' | 'complete' | 'failed'
  const result_id = ref(null)
  const error = ref(null)

  // simulate lifecycle
  watchEffect(() => {
    if (!jobId.value) return

    // reset on new job
    status.value = 'pending'
    result_id.value = null
    error.value = null

    // simulate progression
    setTimeout(() => {
      status.value = 'processing'
    }, 500)

    setTimeout(() => {
      // toggle this to test flows
      const shouldFail = false

      if (shouldFail) {
        status.value = 'failed'
        error.value = 'Mock error'
      } else {
        status.value = 'complete'
        result_id.value = 'mock-result-id'
      }
    }, 2000)
  })

  const job = computed(() => ({
    status: status.value,
    result_id: result_id.value,
    error: error.value
  }))

  return {
    job,
    isFetching: computed(() => status.value === 'pending' || status.value === 'processing')
  }
}