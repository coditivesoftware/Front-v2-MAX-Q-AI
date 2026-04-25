import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/LandingView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('@/views/admin/AdminHomeView.vue'),
      },
      {
        path: 'upload',
        name: 'admin-upload',
        component: () => import('@/views/admin/upload/UploadView.vue'),
      },
      {
        path: 'search',
        name: 'admin-search',
        component: () => import('@/views/admin/search/SearchCriterionView.vue'),
      },
      {
        path: 'processing',
        name: 'admin-processing',
        component: () => import('@/views/admin/search/ProcessingView.vue'),
      },
      {
        path: 'results/:id',
        name: 'admin-results',
        component: () => import('@/views/admin/search/SearchResultsView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
