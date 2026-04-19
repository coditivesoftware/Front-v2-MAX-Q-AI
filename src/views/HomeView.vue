<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProblemSection from '@/components/ProblemSection.vue'
import PrecisionSection from '@/components/PrecisionSection.vue'
import WorkflowSection from '@/components/WorkflowSection.vue'
import AccuracySection from '@/components/AccuracySection.vue'
import FaqSection from '@/components/FaqSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import TheFooter from '@/components/TheFooter.vue'
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
