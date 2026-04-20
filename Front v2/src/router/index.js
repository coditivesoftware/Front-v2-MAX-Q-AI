import { createRouter, createWebHistory } from 'vue-router'
import UploadFilm from '../components/UploadFilm.vue'
import SearchCriterionSelector from '@/components/SearchCriterionSelector.vue'
import ProcessingState from '@/components/ProcessingState.vue'
import SearchResults from '@/components/SearchResults.vue'

const routes = [
    {path:'/',component:UploadFilm},
    {path:'/searchCriterionSelector', component:SearchCriterionSelector},
    {name:'processing', path:'/processing', component:ProcessingState},
    {path:'/searchResults/:id', component:SearchResults},
  ]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
