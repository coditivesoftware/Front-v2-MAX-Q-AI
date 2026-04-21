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
        trigger: '.accuracy-section',
        start: 'top 75%',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.accuracy-title', { opacity: 0, y: 50, duration: 0.8 })
      .from('.accuracy-text', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.accuracy-card', { opacity: 0, y: 30, stagger: 0.12, duration: 0.5 }, '-=0.2')

    // Animate the precision lock bar
    gsap.from('.precision-bar', {
      width: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.accuracy-section',
        start: 'top 70%',
      },
    })
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="accuracy-section bg-[#0a0a0a] py-24 md:py-32">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16">
      <div class="text-center mb-16">
        <h2 class="accuracy-title text-white font-black text-5xl md:text-7xl italic leading-none uppercase mb-6">
          THE ACCURACY STANDARD
        </h2>
        <p class="accuracy-text text-[#6b6b6b] text-base leading-relaxed max-w-2xl mx-auto">
          MAX-Q AI transcribes on the same accuracy standard that post-production workflows depend on. No rounding errors. No lost metadata.
        </p>
      </div>

      <!-- Cards grid 2x2 -->
      <div class="border border-[#2a2a2a] grid grid-cols-1 md:grid-cols-2">

        <!-- Card 1: 99.9% Certainty -->
        <div class="accuracy-card border-b border-r border-[#2a2a2a] p-8 flex flex-col">
          <div class="flex items-center justify-between mb-8">
            <span class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">SEQ_01 // DIALOGUE</span>
            <svg class="w-5 h-5 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-white font-black text-3xl md:text-4xl uppercase mb-4">99.9% CERTAINTY</h3>
          <p class="text-[#6b6b6b] text-sm leading-relaxed mb-8">
            Direct dialogue extraction with sub-syllable verification. We map the script, we don't guess the intent.
          </p>
          <div class="mt-auto flex items-center justify-between border-t border-[#2a2a2a] pt-5">
            <span class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">BANDWIDTH</span>
            <span class="text-[#6b6b6b] text-[10px] tracking-widest uppercase mono">8.4 GB/S</span>
          </div>
        </div>

        <!-- Card 2: Speaker Detect -->
        <div class="accuracy-card border-b border-[#2a2a2a] p-8 flex flex-col">
          <div class="flex items-start justify-between mb-8">
            <span class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">SEQ_02 // IDENT</span>
            <div class="flex items-center gap-2">
              <span class="border border-white text-white text-[9px] tracking-widest uppercase mono px-2 py-0.5">VECTOR_ACTIVE</span>
              <span class="border border-[#3a3a3a] text-[#6b6b6b] text-[9px] tracking-widest uppercase mono px-2 py-0.5">STAGE_01_SEP</span>
            </div>
          </div>
          <h3 class="text-white font-black text-3xl md:text-4xl uppercase mb-4">SPEAKER DETECT</h3>
          <p class="text-[#6b6b6b] text-sm leading-relaxed mb-8">
            MAX-Q identifies individual vocal profiles across complex soundscapes. No manual tagging required.
          </p>
          <div class="mt-auto">
            <p class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono mb-2">PRECISION LOCK</p>
            <div class="w-full h-px bg-[#2a2a2a] relative">
              <div class="precision-bar absolute left-0 top-0 h-px bg-white" style="width: 78%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Sub-Frame Sync -->
        <div class="accuracy-card border-r border-[#2a2a2a] p-8 flex flex-col">
          <div class="flex items-center justify-between mb-8">
            <span class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">SEQ_03 // SYNC</span>
            <svg class="w-5 h-5 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-white font-black text-3xl md:text-4xl uppercase mb-4">SUB-FRAME SYNC</h3>
          <p class="text-[#6b6b6b] text-sm leading-relaxed mb-8">
            Automated removal of drift artifacts. MAX-Q aligns every word to your master timecode with frame-level accuracy.
          </p>
          <div class="mt-auto flex items-center gap-2">
            <span class="border border-[#3a3a3a] text-[#6b6b6b] text-[9px] tracking-widest uppercase mono px-3 py-1.5">NON-DESTRUCTIVE</span>
            <span class="border border-[#3a3a3a] text-[#6b6b6b] text-[9px] tracking-widest uppercase mono px-3 py-1.5">LOSSLESS</span>
          </div>
        </div>

        <!-- Card 4: Multi-Format -->
        <div class="accuracy-card p-8 flex flex-col">
          <div class="flex items-center justify-between mb-8">
            <span class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono">SEQ_04 // DELIVERY</span>
            <svg class="w-5 h-5 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <div class="flex items-start gap-6">
            <div class="flex-1">
              <h3 class="text-white font-black text-3xl md:text-4xl uppercase mb-4">MULTI-FORMAT</h3>
              <p class="text-[#6b6b6b] text-sm leading-relaxed">
                Intelligence ready for deployment. Output is a direct reflection of provided metadata parameters.
              </p>
            </div>
            <div class="w-32 h-20 bg-[#1a1a1a] border border-[#2a2a2a] flex-shrink-0 flex items-center justify-center">
              <span class="text-[#3a3a3a] text-[8px] tracking-widest uppercase mono text-center px-2">SUBMIT_THUMBNAIL</span>
            </div>
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
