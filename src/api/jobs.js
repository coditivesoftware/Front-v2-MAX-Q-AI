import client from './client'

export function getJobStatus(jobId) {
  return client.get(`/jobs/${jobId}/status`)
}

export function cancelJob(jobId) {
  return client.post(`/jobs/${jobId}/cancel`)
}
