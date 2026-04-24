<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 px-8 py-16">
    <h1 class="text-3xl font-light tracking-tight mb-4">Dashboard</h1>
    <p class="text-sm opacity-60 mb-8">Select a tool to get started.</p>
    <div class="flex gap-4">
      <button
        @click="router.push({ name: 'admin-upload' })"
        class="px-6 py-3 border border-[var(--color-outline)] text-sm hover:border-[var(--color-primary)] transition-colors"
      >
        Upload Film
      </button>
      <button
        @click="router.push({ name: 'admin-search' })"
        class="px-6 py-3 border border-[var(--color-outline)] text-sm hover:border-[var(--color-primary)] transition-colors"
      >
        Search Scenes
      </button>
    </div>
  </div>
</template>
