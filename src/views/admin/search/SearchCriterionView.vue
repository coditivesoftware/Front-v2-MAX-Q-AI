<script setup>
import { ref } from 'vue'
import SelectorButton from '@/components/ui/BaseSelectorButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SearchPromptBox from '@/components/admin/search/SearchPromptBox.vue'
import { useRouter } from 'vue-router'

import CoreStoryIcon from '@/components/icons/CoreStoryIcon.vue'
import PromptSearchIcon from '@/components/icons/PromptSearchIcon.vue'

const router = useRouter()


const selected = ref('free')
const prompt = ref('')


function select(type) {
  selected.value = type
}

function continuar() {
  if (!selected.value) return
  console.log('Continuing with:', selected.value, prompt.value)
  router.push({name:'admin-processing', query:{job_id:'asdfg', job_type:'scene_analysis', selectedValue:selected.value, prompt:prompt.value}})
}



</script>

<template>
  <main class="flex-1 flex items-start justify-center px-30 pt-[72px] pb-12">
    <div class="w-full max-w-[780px] flex flex-col gap-8">

      <!-- Header -->
      <div class="flex flex-col gap-2.5">
        <h1 class="text-[clamp(28px,4vw,40px)] font-normal tracking-[-0.01em] leading-[1.15]">
          Select Search Type
        </h1>
        <p class="text-[14px] leading-relaxed max-w-[520px]">
          Define the type of sequences or scenes you want to find from your footage.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-2 gap-3">

        <!-- Core Story -->
     <SelectorButton title="Core Story" 
     description="Find the sequences that best deliver the core story of your film." :selected="selected" click-id="core" :icon="CoreStoryIcon" @on-click="select('core') "></SelectorButton>

     <SelectorButton title="Prompt Search" description="Describe the mood or specific characters you want to find with a prompt" :selected="selected" click-id="free" :icon="PromptSearchIcon" @on-click="select('free')"></SelectorButton>
     
      </div>

      <!-- Prompt box -->
      <Transition name="prompt">
     <SearchPromptBox v-if="selected === 'free'" v-model="prompt"></SearchPromptBox>      
      </Transition>

      <!-- CTA -->
      <div class="flex justify-end">
        <BaseButton can-submit="!selected" title="Continuar" @click="continuar"></BaseButton>
      </div>

    </div>
  </main>
</template>

<style scoped>
.prompt-enter-active,
.prompt-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>