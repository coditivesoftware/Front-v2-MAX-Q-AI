import client from './client'

export function uploadFilm(file, metadata, { onProgress } = {}) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', metadata.name)
  if (metadata.description) {
    formData.append('description', metadata.description)
  }

  return client.post('/films/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    },
  })
}

export function getFilm(id) {
  return client.get(`/films/${id}`)
}

export function listFilms(params = {}) {
  return client.get('/films', { params })
}
