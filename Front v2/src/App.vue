<script setup>
import BaseNavBar from './components/BaseNavBar.vue'
import {useRoute} from 'vue-router'
import { reactive } from 'vue'




const navItems = reactive([
  { label: 'SearchCriterion', to: '/' },
  { label: 'UploadFilm',  to: '/uploadFilm'  },
])


</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
  <BaseNavBar/>
  <main class="flex-1 overflow-y-auto pt-20">
      <RouterView />
  </main>
</div>
</template>

<style scoped></style>
