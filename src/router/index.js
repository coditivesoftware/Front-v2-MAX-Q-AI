import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadFilm from '@/views/sceneSelector/UploadFilm.vue'
import SearchCriterionSelector from '@/views/sceneSelector/SearchCriterionSelector.vue'
import ProcessingState from '@/views/sceneSelector/ProcessingState.vue'
import SearchResults from '@/views/sceneSelector/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {path:'/uploadFilm',component:UploadFilm},
  {path:'/searchCriterionSelector', component:SearchCriterionSelector},
  {name:'processing', path:'/processing', component:ProcessingState},
  {path:'/searchResults/:id', component:SearchResults},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
