<script setup>
import BaseNavBar from '@/components/ui/BaseNavBar.vue'
import { reactive } from 'vue'

const navItems = reactive([
  { label: 'Projects', to: '/admin/projects' },
  { label: 'Upload', to: '/admin/upload' },
  { label: 'Search', to: '/admin/search' },
])
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <BaseNavBar :navItems="navItems" />
    <main class="flex-1 overflow-y-auto pt-20">
      <RouterView />
    </main>
  </div>
</template>
