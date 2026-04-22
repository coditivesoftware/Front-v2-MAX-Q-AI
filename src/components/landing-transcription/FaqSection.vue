<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 75%',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.faq-title', { opacity: 0, y: 40, duration: 0.7 })
      .from('.faq-text', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.faq-feature', { opacity: 0, x: -20, stagger: 0.1, duration: 0.4 }, '-=0.2')
      .from('.faq-specs', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
  })
})

onUnmounted(() => ctx?.revert())

const features = [
  'OVERLAPPING DIALOGUE SUPPORT',
  'CUSTOM INDUSTRY VOCABULARY',
  'SUB-FRAME TIMESTAMP PRECISION',
]

const specs = [
  { label: 'PROCESSING', value: '120x REALTIME' },
  { label: 'ENCRYPTION', value: 'AES-256' },
  { label: 'LANGUAGES', value: '95+ NATIVE' },
  { label: 'UPTIME', value: '99.99%' },
]
</script>

<template>
  <section class="faq-section bg-[#111111] py-24 md:py-32">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <!-- Left: FAQ copy -->
      <div>
        <h2 class="faq-title text-white font-black text-4xl md:text-5xl leading-tight mb-8">
          Will it handle my film's dialogue accurately?
        </h2>
        <p class="faq-text text-[#6b6b6b] text-base leading-relaxed mb-10 max-w-md">
          MAX-Q AI transcribes from your actual audio — not a generic model trained on customer service calls. Built for scripted dialogue, intense accents, and overlapping speech in noisy environments.
        </p>

        <!-- Feature checklist -->
        <ul class="flex flex-col gap-5">
          <li
            v-for="(feature, i) in features"
            :key="i"
            class="faq-feature flex items-center gap-4"
          >
            <div class="w-5 h-5 rounded-full border border-white flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-[#6b6b6b] text-[11px] tracking-widest uppercase mono">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Right: Specs card -->
      <div class="faq-specs border border-[#2a2a2a] p-8 bg-[#0d0d0d]">
        <p class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono mb-8">
          SYSTEM_SPECIFICATIONS_V1
        </p>

        <!-- Specs grid -->
        <div class="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#2a2a2a]">
          <div v-for="(spec, i) in specs" :key="i">
            <p class="text-[#3a3a3a] text-[9px] tracking-widest uppercase mono mb-2">
              {{ spec.label }}
            </p>
            <p class="text-white font-black text-2xl md:text-3xl uppercase">
              {{ spec.value }}
            </p>
          </div>
        </div>

        <!-- Cloud nodes -->
        <div class="flex items-center gap-4">
          <div class="h-12 bg-[#c62f2f] border border-l-4 border-[#2a2a2a] flex-shrink-0"></div>
          <div>
            <p class="text-white text-sm font-bold tracking-widest uppercase mono">ORBITAL CLOUD NODES</p>
            <p class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">DISTRIBUTED GPU COMPUTE</p>
          </div>
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
