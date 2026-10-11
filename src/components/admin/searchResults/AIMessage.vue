<script setup>
import AIChatNameHandler from './AIChatNameHandler.vue'
import { ref, computed } from 'vue'

const film = ref({
  mainIdea: 'A powerful gangster family taking over a casino.',
  world: 'Gangster Family',
  duration: 6240
})

</script>

<template>
      <div class="flex items-start gap-3">
        <div>
            <div class="w-5 h-5 rounded-full border border-[#c8ff00] flex items-center justify-center text-[8px] text-[#c8ff00] font-mono">Q</div>
        </div>
        <div class="pb-6">
              <AIChatNameHandler />

              <p>
                I analyzed the footage. These are the main ideas.
              </p>
            </div>

        </div>

</template>