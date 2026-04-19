<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.cta-badge', { opacity: 0, y: 20, duration: 0.5 })
      .from('.cta-title', { opacity: 0, y: 50, duration: 0.8 }, '-=0.2')
      .from('.cta-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.cta-form', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.cta-launch', { opacity: 0, duration: 0.4 }, '-=0.1')
  })
})

onUnmounted(() => ctx?.revert())

const email = ref('')

function handleSubmit() {
  if (!email.value) return
  // Handle form submission
  email.value = ''
}
</script>

<template>
  <section class="cta-section bg-[#0a0a0a] py-32 md:py-40">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
      <!-- Badge -->
      <div class="cta-badge mb-8">
        <span class="border border-[#3a3a3a] text-[#6b6b6b] text-[10px] tracking-widest uppercase mono px-4 py-1.5">
          TRANSMISSION_RESERVED
        </span>
      </div>

      <!-- Headline -->
      <h2 class="cta-title text-white font-black text-5xl md:text-7xl lg:text-8xl leading-tight max-w-4xl mb-8">
        MAX-Q AI transcription is in development.
      </h2>

      <!-- Subtitle -->
      <p class="cta-subtitle text-[#6b6b6b] text-base md:text-lg leading-relaxed max-w-2xl mb-12">
        You can be one of the first to use it on your next production. Reserve your slot in the deployment sequence.
      </p>

      <!-- Email form -->
      <form @submit.prevent="handleSubmit" class="cta-form flex w-full max-w-2xl mb-6">
        <input
          v-model="email"
          type="email"
          placeholder="ENTER MISSION EMAIL"
          class="flex-1 bg-transparent border border-[#3a3a3a] text-white placeholder-[#3a3a3a] text-xs tracking-widest uppercase mono px-6 py-5 focus:outline-none focus:border-white transition-colors duration-200"
        />
        <button
          type="submit"
          class="bg-white text-black font-black text-sm tracking-widest uppercase px-10 py-5 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
        >
          JOIN
        </button>
      </form>

      <!-- Launch info -->
      <p class="cta-launch text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">
        LAUNCH WINDOW: Q4 2024 // SECTOR: GLOBAL
      </p>
    </div>
  </section>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
