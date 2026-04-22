
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStatus } from '@/composables/useJobStatus'
import { JOB_ROUTES } from '@/config/jobRoutes'
const route  = useRoute()
const router = useRouter()

const jobId   = computed(() => route.query.job_id)
const jobType = computed(() => route.query.job_type)

const { job } = useJobStatus(jobId)




defineProps({
  message: {
    type: String,
    default: 'It will just take a minute.'
  }
})




watch(job, (val) => {
  console.log('[normalized job]:', val)

  if (!val) return

  if (val.status === 'complete') {
    const destination = JOB_ROUTES[jobType.value]?.(val.result_id)
    if (destination) router.push(destination)
  }

  if (val.status === 'failed') {
    router.push({ name: 'error', query: { job_id: jobId.value } })
  }
})


</script>

<template>
  <div class="fixed inset-0 bg-[var(--color-surface)] flex items-center justify-center flex-col gap-3.5 px-30">
    
    <div class="relative w-20 h-20 flex items-center justify-center">
      <svg
        class="absolute inset-0 animate-[spin_8s_linear_infinite]"
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <line x1="40" y1="40" x2="40"  y2="9"  stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.9"/>
        <line x1="40" y1="40" x2="62"  y2="18" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
        <line x1="40" y1="40" x2="71"  y2="40" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.55"/>
        <line x1="40" y1="40" x2="62"  y2="62" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
        <line x1="40" y1="40" x2="40"  y2="71" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.3"/>
        <line x1="40" y1="40" x2="18"  y2="62" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
        <line x1="40" y1="40" x2="9"   y2="40" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.55"/>
        <line x1="40" y1="40" x2="18"  y2="18" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>

        <circle cx="40"  cy="9"  r="2.2" fill="var(--color-primary)" opacity="0.9"/>
        <circle cx="62"  cy="18" r="2.2" fill="var(--color-primary)" opacity="0.7"/>
        <circle cx="71"  cy="40" r="2.2" fill="var(--color-primary)" opacity="0.55"/>
        <circle cx="62"  cy="62" r="2.2" fill="var(--color-primary)" opacity="0.4"/>
        <circle cx="40"  cy="71" r="2.2" fill="var(--color-primary)" opacity="0.3"/>
        <circle cx="18"  cy="62" r="2.2" fill="var(--color-primary)" opacity="0.4"/>
        <circle cx="9"   cy="40" r="2.2" fill="var(--color-primary)" opacity="0.55"/>
        <circle cx="18"  cy="18" r="2.2" fill="var(--color-primary)" opacity="0.7"/>
      </svg>

      <span class="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-[pulse_1.8s_ease-in-out_infinite]" />
    </div>




    <div class="flex flex-col items-center gap-1.5 animate-[fadeInUp_0.6s_ease_forwards]">
      <h1 class=" text-[var(--color-primary)] font-[var(--font-maxq-headlines-font-family)] font-bold text-2xl tracking-[0.01em]">
        Analizing Film
      </h1>
      <p class="text-sm text-[var(--color-on-secondary)] font-[var(--font-maxq-text-font-family)]  tracking-[0.03em]">
        {{ message }}
      </p>
    </div>

  </div>
</template>