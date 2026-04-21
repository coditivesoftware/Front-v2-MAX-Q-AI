<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const errorCards = [
  {
    code: '0x442',
    latency: 'HIGH',
    latencyColor: 'text-red-400',
    engine: 'GENERIC_ENGINE_OUTPUT:',
    quote: '"The character was talking about... [unintelligible]... something about a car?"',
    active: true,
  },
  {
    code: '0x218',
    latency: 'NOMINAL',
    latencyColor: 'text-[#6b6b6b]',
    engine: 'GENERIC_ENGINE_OUTPUT:',
    quote: '"I\'m here for the [inaudible] party."',
    active: false,
  },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.problem-section',
        start: 'top 80%',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.problem-label', { opacity: 0, y: 20, duration: 0.5 })
      .from('.problem-title', { opacity: 0, y: 40, duration: 0.7 }, '-=0.2')
      .from('.problem-text', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.problem-card', { opacity: 0, y: 30, stagger: 0.15, duration: 0.5 }, '-=0.3')
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="problem-section bg-[#0d0d0d] py-24 md:py-32">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Left: copy -->
      <div>
        <p class="problem-label text-[#c87941] text-[10px] tracking-widest uppercase mono mb-6">
          CRITICAL_FAIL_ANALYSIS
        </p>
        <h2 class="title text-bold text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
          Transcript Errors Cost You Festivals
        </h2>
        <p class="problem-text text-[#6b6b6b] text-base leading-relaxed max-w-md">
          Generic transcription tools miss film dialogue. Ours doesn't.
        </p>
      </div>

      <!-- Right: error cards -->
      <div class="flex flex-col gap-4">
        <div v-for="(card, i) in errorCards" :key="i" class="problem-card border border-[#2a2a2a] p-5 relative"
          :class="card.active ? 'border-l-2 border-l-[#c87941]' : 'opacity-60'">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[#6b6b6b] text-[10px] tracking-widest uppercase mono">
              ERROR_CODE: {{ card.code }}
            </span>
            <span class="text-[10px] tracking-widest uppercase mono" :class="card.latencyColor">
              LATENCY: {{ card.latency }}
            </span>
          </div>
          <p class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono mb-3">
            {{ card.engine }}
          </p>
          <p class="text-[#6b6b6b] text-sm leading-relaxed italic">
            {{ card.quote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
