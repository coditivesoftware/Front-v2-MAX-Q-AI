<script setup>
import BaseNavBar from './components/BaseNavBar.vue'
import { useRoute } from 'vue-router'
import { reactive, computed } from 'vue'

const route = useRoute()

const isHome = computed(() => route.path === '/')

const navItems = reactive([
  { label: 'SearchCriterion', to: '/' },
  { label: 'UploadFilm',  to: '/uploadFilm'  },
])
</script>

<template>
  <!-- Home route: full-page layout for GSAP ScrollTrigger (window scroll) -->
  <div v-if="isHome">
    <RouterView />
  </div>

  <!-- Other routes: app shell with BaseNavBar -->
  <div v-else class="flex flex-col h-screen overflow-hidden">
    <BaseNavBar :navItems="navItems" />
    <main class="flex-1 overflow-y-auto pt-20">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
