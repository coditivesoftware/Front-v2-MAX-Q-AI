import client from './client'

export function startSearch(filmId, params) {
  return client.post(`/films/${filmId}/search`, params)
}

export function getSearchResults(resultId) {
  return client.get(`/search/results/${resultId}`)
}
