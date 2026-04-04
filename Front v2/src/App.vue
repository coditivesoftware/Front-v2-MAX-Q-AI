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
  <BaseNavBar :navItems="navItems"/>
  <main class="pt-20 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 py-10">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
