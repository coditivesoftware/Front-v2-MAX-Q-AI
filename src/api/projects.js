import client from './client'

export function listProjects() {
  return client.get('/projects/')
}

export function createProject({ name, description }) {
  return client.post('/projects/', { name, description })
}

export function getProject(projectId) {
  return client.get(`/projects/${projectId}/`)
}
