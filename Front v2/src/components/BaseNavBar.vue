<script setup>
import { RouterLink, useRoute} from 'vue-router'

const route = useRoute()

defineProps({
  navItems:{
    type:Array,
    required:true
  }
})

const avatarSrc = ''

</script>

<template>
    <header class="bg-surface border-b border-white/10 z-50 fixed top-0 w-full flex justify-between items-center px-6 py-4 shadow-[0px_12px_32px_rgba(0,220,229,0.06)]">
  
      <div class="flex items-center gap-8">
        <span class="text-xl font-bold tracking-tighter text-primary font-headline">
          Scene Finder
        </span>
  
        <nav class="hidden md:flex gap-6 items-center">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="font-headline tracking-tight text-sm uppercase transition-all duration-300"
            :class="route.path === item.to
              ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-2'
              : 'text-on-surface-variant hover:text-on-surface'"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
  
      <div class="flex items-center gap-4">
        <button class="material-symbols-outlined text-on-surface-variant hover:bg-white/5 p-2 transition-all duration-300">
          notifications
        </button>
        <button class="material-symbols-outlined text-on-surface-variant hover:bg-white/5 p-2 transition-all duration-300">
          settings
        </button>
  
        <div class="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-white/10">
          <img
            v-if="avatarSrc"
            :src="avatarSrc"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
  
    </header>


  </template>
  
