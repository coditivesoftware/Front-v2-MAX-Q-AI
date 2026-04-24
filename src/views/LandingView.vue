<script setup>
import TheNavbar from '@/components/landing/TheNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import ProblemSection from '@/components/landing/ProblemSection.vue'
import PrecisionSection from '@/components/landing/PrecisionSection.vue'
import WorkflowSection from '@/components/landing/WorkflowSection.vue'
import AccuracySection from '@/components/landing/AccuracySection.vue'
import FaqSection from '@/components/landing/FaqSection.vue'
import CtaSection from '@/components/landing/CtaSection.vue'
import TheFooter from '@/components/landing/TheFooter.vue'
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
