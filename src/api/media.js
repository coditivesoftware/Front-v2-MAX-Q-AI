import client from './client'
import axios from 'axios'

const MULTIPART_THRESHOLD = 500 * 1024 * 1024

export function resolveAssetType(mimeType) {
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.startsWith('image/')) return 'image'
  return 'other'
}

export function shouldUseMultipart(file) {
  return file.type.startsWith('video/') && file.size > MULTIPART_THRESHOLD
}

// --- Simple upload ---

export function initSimpleUpload(projectId, { file_name, mime_type, size, asset_type }) {
  return client.post(`/projects/${projectId}/media/init-upload/`, {
    file_name,
    mime_type,
    size,
    asset_type,
    metadata: { source: 'frontend' },
  })
}

export function uploadToS3(uploadUrl, fileOrBlob, mimeType, { onProgress } = {}) {
  return axios.put(uploadUrl, fileOrBlob, {
    headers: { 'Content-Type': mimeType },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress({ loaded: e.loaded, total: e.total })
      }
    },
  })
}

export function confirmUpload(projectId, assetId) {
  return client.post(`/projects/${projectId}/media/${assetId}/confirm-upload/`, {
    metadata: { source: 'frontend-confirm' },
  })
}

// --- Multipart upload ---

export function initMultipartUpload(projectId, { file_name, mime_type, size }) {
  return client.post(`/projects/${projectId}/media/init-multipart-upload/`, {
    file_name,
    mime_type,
    size,
    asset_type: 'video',
    metadata: { source: 'frontend' },
  })
}

export function signMultipartPart(projectId, assetId, { upload_id, part_number }) {
  return client.post(`/projects/${projectId}/media/${assetId}/sign-multipart-part/`, {
    upload_id,
    part_number,
  })
}

export function completeMultipartUpload(projectId, assetId, { upload_id, parts }) {
  return client.post(`/projects/${projectId}/media/${assetId}/complete-multipart-upload/`, {
    upload_id,
    parts,
    metadata: { source: 'frontend-complete' },
  })
}

// --- Transcription ---

export function requestTranscription(projectId, assetId) {
  return client.post(`/projects/${projectId}/media/${assetId}/transcriptions/`, {
    metadata: { source: 'web' },
  })
}

export function getTranscription(projectId, assetId) {
  return client.get(`/projects/${projectId}/media/${assetId}/transcriptions/`)
}
