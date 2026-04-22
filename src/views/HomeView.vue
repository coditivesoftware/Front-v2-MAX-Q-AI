<script setup>
import TheNavbar from '@/components/landing-transcription/TheNavbar.vue'
import HeroSection from '@/components/landing-transcription/HeroSection.vue'
import ProblemSection from '@/components/landing-transcription/ProblemSection.vue'
import PrecisionSection from '@/components/landing-transcription/PrecisionSection.vue'
import WorkflowSection from '@/components/landing-transcription/WorkflowSection.vue'
import AccuracySection from '@/components/landing-transcription/AccuracySection.vue'
import FaqSection from '@/components/landing-transcription/FaqSection.vue'
import CtaSection from '@/components/landing-transcription/CtaSection.vue'
import TheFooter from '@/components/landing-transcription/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a]">
    <TheNavbar />
    <main class="pt-14">
      <HeroSection />
      <ProblemSection />
      <PrecisionSection />
      <WorkflowSection />
      <AccuracySection />
      <FaqSection />
      <CtaSection />
    </main>
    <TheFooter />
  </div>
</template>
