<script setup>
defineProps({
  status: { type: String, default: 'idle' },
  progress: { type: Number, default: 0 },
  error: String,
})

const STATUS_LABELS = {
  idle: 'Esperando archivo...',
  signing: 'Preparando subida...',
  uploading: 'Subiendo archivo...',
  confirming: 'Confirmando...',
  processing: 'Procesando transcripcion...',
  ready: 'Completado',
  failed: 'Error',
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <label class="text-xs tracking-widest uppercase">Estado</label>
      <span class="text-xs text-[var(--color-on-secondary)] opacity-50">
        {{ status === 'uploading' ? `${progress}%` : STATUS_LABELS[status] || status }}
      </span>
    </div>
    <div class="h-px w-full bg-[var(--color-outline)]">
      <div
        class="h-px transition-all duration-500 ease-out"
        :class="status === 'failed' ? 'bg-[var(--color-on-error)]' : 'bg-[var(--color-primary)]'"
        :style="{ width: `${status === 'ready' ? 100 : progress}%` }"
      />
    </div>
    <p v-if="error" class="text-xs text-[var(--color-on-error)]">{{ error }}</p>
    <p v-else-if="status !== 'idle'" class="text-xs text-[var(--color-on-secondary)]">
      {{ STATUS_LABELS[status] || status }}
    </p>
  </div>
</template>
