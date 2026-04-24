<script setup>
import { ref } from 'vue'

const activeNav = ref('TRANSCRIPTION')
const navItems = ['TRANSCRIPTION', 'BLOG', 'FAQ']
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function selectNav(item) {
  activeNav.value = item
  menuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
    <nav class="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Logo -->
      <span class="text-white font-black text-sm tracking-widest uppercase">
        MAX-Q IA
      </span>

      <!-- Nav Links (desktop) -->
      <ul class="hidden md:flex items-center gap-10">
        <li v-for="item in navItems" :key="item">
          <button
            @click="activeNav = item"
            class="text-xs tracking-widest uppercase transition-colors duration-200"
            :class="activeNav === item
              ? 'text-white border-b border-white pb-0.5'
              : 'text-[#6b6b6b] hover:text-white'"
          >
            {{ item }}
          </button>
        </li>
      </ul>

      <!-- CTA (desktop) -->
      <button class="hidden md:block border border-white text-white text-xs font-bold tracking-widest uppercase px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200">
        JOIN WAITLIST
      </button>

      <!-- Hamburger (mobile) -->
      <button
        @click="toggleMenu"
        class="md:hidden flex flex-col gap-1.5 p-1"
        aria-label="Toggle menu"
      >
        <span
          class="block w-5 h-px bg-white transition-all duration-200"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="block w-5 h-px bg-white transition-all duration-200"
          :class="menuOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block w-5 h-px bg-white transition-all duration-200"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="menuOpen"
      class="md:hidden bg-[#0a0a0a] border-t border-[#2a2a2a] px-6 py-6 flex flex-col gap-6"
    >
      <ul class="flex flex-col gap-5">
        <li v-for="item in navItems" :key="item">
          <button
            @click="selectNav(item)"
            class="text-xs tracking-widest uppercase transition-colors duration-200 w-full text-left"
            :class="activeNav === item ? 'text-white' : 'text-[#6b6b6b]'"
          >
            {{ item }}
          </button>
        </li>
      </ul>
      <button class="border border-white text-white text-xs font-bold tracking-widest uppercase px-5 py-3 w-full hover:bg-white hover:text-black transition-colors duration-200">
        JOIN WAITLIST
      </button>
    </div>
  </header>
</template>
