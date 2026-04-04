import { createRouter, createWebHistory } from 'vue-router'
import UploadFilm from '../components/UploadFilm.vue'
import SearchCriterionSelector from '@/components/SearchCriterionSelector.vue'

const routes = [
    {path:'/',component:SearchCriterionSelector},
    {path:'/uploadFilm',component:UploadFilm}
  ]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
