<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import imgDragDrop from '@/assets/images/landing-transcription/Drag and Drop.png'
import imgChooseLanguages from '@/assets/images/landing-transcription/choose languages.png'
import imgDownload from '@/assets/images/landing-transcription/ download your transcription.png'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'UPLOAD YOUR FOOTAGE',
    description: 'Upload your footage. Drop your film file — any format works.',
    img: imgDragDrop,
  },
  {
    number: '02',
    title: 'SET PARAMETERS',
    description: 'Choose languages. Pick the markets you\'re targeting.',
    img: imgChooseLanguages,
  },
  {
    number: '03',
    title: 'DOWNLOAD TRANSCRIPT',
    description: 'Download your transcription. Any format and ready to submit.',
    img: imgDownload,
  },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.workflow-section',
        start: 'top 75%',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.workflow-label', { opacity: 0, y: 20, duration: 0.5 })
      .from('.workflow-title', { opacity: 0, y: 40, duration: 0.7 }, '-=0.2')
      .from('.workflow-step', { opacity: 0, y: 40, stagger: 0.15, duration: 0.6 }, '-=0.3')
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="workflow-section bg-[#111111] py-24 md:py-32">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16">
      <div class="mb-16">
        <p class="workflow-label text-[#6b6b6b] text-[10px] tracking-widest uppercase mono mb-5">
          OPERATION_WORKFLOW
        </p>
        <h2 class="title text-white font-black text-4xl md:text-5xl leading-tight">
          Three stages to payload delivery.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <div v-for="(step, i) in steps" :key="i" class="workflow-step flex flex-col">
          <span class="text-[#2a2a2a] font-black text-7xl md:text-8xl leading-none mb-6 select-none">
            {{ step.number }}
          </span>
          <h3 class="text-white font-black text-sm tracking-widest uppercase mb-4">
            {{ step.title }}
          </h3>
          <p class="text-[#6b6b6b] text-sm leading-relaxed mb-8 flex-1">
            {{ step.description }}
          </p>
          <img :src="step.img" alt="Precision panel" class="w-full h-full object-cover">
          <div class="h-px bg-[#2a2a2a] w-full"></div>
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
