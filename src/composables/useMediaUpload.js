import { ref, computed, readonly } from 'vue'
import {
  resolveAssetType,
  shouldUseMultipart,
  initSimpleUpload,
  uploadToS3,
  confirmUpload,
  initMultipartUpload,
  signMultipartPart,
  completeMultipartUpload,
} from '@/api/media'

export function useMediaUpload() {
  const status = ref('idle')
  const progress = ref(0)
  const error = ref(null)
  const assetId = ref(null)

  async function simpleUpload(projectId, file) {
    const mimeType = file.type
    const assetType = resolveAssetType(mimeType)

    status.value = 'signing'
    const { data } = await initSimpleUpload(projectId, {
      file_name: file.name,
      mime_type: mimeType,
      size: file.size,
      asset_type: assetType,
    })
    assetId.value = data.asset_id

    status.value = 'uploading'
    await uploadToS3(data.upload_url, file, mimeType, {
      onProgress({ loaded, total }) {
        progress.value = Math.round((loaded / total) * 100)
      },
    })

    status.value = 'confirming'
    await confirmUpload(projectId, data.asset_id)
  }

  async function multipartUpload(projectId, file) {
    const mimeType = file.type

    status.value = 'signing'
    const { data } = await initMultipartUpload(projectId, {
      file_name: file.name,
      mime_type: mimeType,
      size: file.size,
    })
    assetId.value = data.asset_id

    const { upload_id, part_size } = data
    const totalParts = Math.ceil(file.size / part_size)
    const parts = []
    let uploaded = 0

    status.value = 'uploading'
    for (let i = 0; i < totalParts; i++) {
      const start = i * part_size
      const end = Math.min(start + part_size, file.size)
      const blob = file.slice(start, end)
      const partNumber = i + 1

      const { data: signData } = await signMultipartPart(projectId, data.asset_id, {
        upload_id,
        part_number: partNumber,
      })

      const response = await uploadToS3(signData.upload_url, blob, mimeType, {
        onProgress({ loaded }) {
          progress.value = Math.round(((uploaded + loaded) / file.size) * 100)
        },
      })

      uploaded += blob.size
      parts.push({
        part_number: partNumber,
        etag: response.headers.etag,
      })
    }

    status.value = 'confirming'
    await completeMultipartUpload(projectId, data.asset_id, {
      upload_id,
      parts,
    })
  }

  async function upload(projectId, file) {
    progress.value = 0
    error.value = null
    assetId.value = null

    try {
      if (shouldUseMultipart(file)) {
        await multipartUpload(projectId, file)
      } else {
        await simpleUpload(projectId, file)
      }
      status.value = 'ready'
    } catch (err) {
      status.value = 'failed'
      error.value = err.response?.data?.detail || err.message || 'Error al subir el archivo'
    }
  }

  function reset() {
    status.value = 'idle'
    progress.value = 0
    error.value = null
    assetId.value = null
  }

  return {
    status: readonly(status),
    progress: readonly(progress),
    error: readonly(error),
    assetId: readonly(assetId),
    isUploading: computed(() => ['signing', 'uploading', 'confirming'].includes(status.value)),
    upload,
    reset,
  }
}
