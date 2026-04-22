<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-grid', { opacity: 0, duration: 1.5 })
      .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 }, '-=1')
      .from('.hero-title', { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
      .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-labels span', { opacity: 0, stagger: 0.2, duration: 0.5 }, '-=0.3')
      .from('.hero-diamond', { opacity: 0, scale: 0.8, duration: 1.2, ease: 'power2.out' }, '-=1')
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="relative bg-[#0a0a0a] overflow-hidden" style="min-height: calc(100vh - 56px);">
    <!-- Grid background -->
    <div class="hero-grid absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Geometric diamond shape -->
    <div class="hero-diamond hidden md:block absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
      aria-hidden="true">
      <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="150" y="150" width="300" height="300" stroke="#ffffff" stroke-width="0.5"
          transform="rotate(45 300 300)" />
        <rect x="100" y="100" width="400" height="400" stroke="#ffffff" stroke-width="0.3"
          transform="rotate(45 300 300)" />
        <rect x="200" y="200" width="200" height="200" stroke="#ffffff" stroke-width="0.5"
          transform="rotate(45 300 300)" />
        <line x1="0" y1="300" x2="600" y2="300" stroke="#ffffff" stroke-width="0.3" />
        <line x1="300" y1="0" x2="300" y2="600" stroke="#ffffff" stroke-width="0.3" />
      </svg>
    </div>

    <!-- Left vertical status labels -->
    <div
      class="hero-labels hidden md:flex absolute left-0 top-0 bottom-0 w-8 flex-col items-center justify-between py-24 pointer-events-none"
      aria-hidden="true">
      <span class="text-[#3a3a3a] text-[9px] tracking-widest uppercase mono"
        style="writing-mode: vertical-rl; transform: rotate(180deg);">STATUS: ACTIVE</span>
      <span class="text-[#3a3a3a] text-[9px] tracking-widest uppercase mono"
        style="writing-mode: vertical-rl; transform: rotate(180deg);">LATENCY: 12MS</span>
      <span class="text-[#3a3a3a] text-[9px] tracking-widest uppercase mono"
        style="writing-mode: vertical-rl; transform: rotate(180deg);">COORD: 28.37ZN - N</span>
    </div>

    <!-- Main content -->
    <div
      class="relative z-10 flex flex-col justify-center text-center px-6 md:pl-24 md:pr-16 max-w-screen-xl mx-auto w-full py-24"
      style="min-height: inherit;">
      <div class="hero-badge inline-flex mb-8">
        <span class="border border-[#3a3a3a] text-[#6b6b6b] text-[10px] tracking-widest uppercase mono px-3 py-1.5">
          PROJECT_MAX_Q // V0.1.2
        </span>
      </div>

      <h2 class="title text-white font-black leading-none text-4xl md:text-7xl lg:text-6xl max-w-5xl mb-8">
        Your Film
        <br />
      </h2>
      <h1 class="title text-white font-black leading-none text-4xl md:text-7xl lg:text-8xl max-w-5xl mb-25">
        Transcribed In An Instant
      </h1>

      <div class="flex justify-center">
        <p class="hero-subtitle text-[#6b6b6b] text-base md:text-lg max-w-xl mb-12 leading-relaxed text-center">
          Upload your footage. Get a clean, timestamped script.<br />
          Ready for subtitles, dubbing, and festival delivery.
        </p>
      </div>


      <div class="hero-cta">
        <button
          class="bg-white text-black font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-gray-200 cursor-pointer hover:scale-105 transition-all duration-200">
          JOIN WAITLIST
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
