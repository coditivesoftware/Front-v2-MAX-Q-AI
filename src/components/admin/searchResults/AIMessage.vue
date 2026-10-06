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
        <div>
              <AIChatNameHandler />

              <p class="text-xs text-gray-400 leading-relaxed">
                <span class="inline-block w-1.5 h-1.5 bg-[#c8ff00] rounded-full mr-2 animate-pulse"></span>
                I analyzed the footage. These are the main ideas.
              </p>
  
              <div class="mt-4 ml-6">
                <div class="text-[9px] text-gray-500 uppercase tracking-wider">Main Idea</div>
                <div class="text-xs text-gray-300">{{ film.mainIdea }}</div>
              </div>
  
              <div class="mt-3 ml-6">
                <div class="text-[9px] text-gray-500 uppercase tracking-wider">General World</div>
                <div class="text-xs text-gray-300">{{ film.world }}</div>
              </div>
            </div>

        </div>

</template>