<script setup>
import { ref, computed } from 'vue'
import AIMessage from '@/components/admin/searchResults/AIMessage.vue'
import KeyframeGroupSelector from '@/components/admin/searchResults/KeyframeGroupSelector.vue'


const film = ref({
  mainIdea: 'A powerful gangster family taking over a casino.',
  world: 'Gangster Family',
  duration: 6240
})

const acts = ref([
  { id: 'hook', label: 'Hook – Act 1', kfCount: 5 },
  { id: 'body', label: 'Body – Act 2', kfCount: 7 },
  { id: 'climax', label: 'Climax – Act 3', kfCount: 4 }
])


const keyframeData = {
  hook: [
    { pct: 10, tc: '00:04:22', text: 'Intro tension scene' },
    { pct: 25, tc: '00:12:08', text: 'Casino reveal' }
  ],
  body: [
    { pct: 50, tc: '00:51:38', text: 'Conflict escalation' }
  ],
  climax: [
    { pct: 90, tc: '01:33:41', text: 'Final confrontation' }
  ]
}

const selectedAct = ref(null)
const hoveredKf = ref(null)
const progressPct = ref(0)
const playing = ref(false)

const currentKeyframes = computed(() =>
  selectedAct.value ? keyframeData[selectedAct.value] : []
)

const activeAnnotation = computed(() =>
  hoveredKf.value !== null ? currentKeyframes.value[hoveredKf.value] : {}
)

const timecode = computed(() => {
  const sec = Math.round((progressPct.value / 100) * film.value.duration)
  const h = String(Math.floor(sec / 3600)).padStart(2, '0')
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
})

function selectAct(id) {
  selectedAct.value = id
}
function hoverKf(i) { hoveredKf.value = i }
function leaveKf() { hoveredKf.value = null }
function prevKf() { hoveredKf.value = Math.max(0, hoveredKf.value - 1) }
function nextKf() { hoveredKf.value = Math.min(currentKeyframes.value.length - 1, hoveredKf.value + 1) }
function seekTimeline(e) {
  const rect = e.target.getBoundingClientRect()
  progressPct.value = ((e.clientX - rect.left) / rect.width) * 100
}

let interval
function togglePlay() {
  playing.value = !playing.value
  if (playing.value) {
    interval = setInterval(() => {
      progressPct.value += 0.2
      if (progressPct.value >= 100) {
        progressPct.value = 0
        playing.value = false
        clearInterval(interval)
      }
    }, 100)
  } else clearInterval(interval)
}
</script>


<template>

    
  
      <div class="flex flex-1 overflow-hidden h-full">
        <!-- LEFT PANEL -->
        <div class="w-[280px] bg-[#111] border-r border-white/10 flex flex-col ">
          <div class="flex-1 overflow-y-auto p-4  ">

            <div class="mb-3">
              
              <p>
                PROJECT
              </p>
              <h1>FRAGMENT CERO</h1>
            </div>
          
            <!-- AI MESSAGE -->
            <AIMessage/>
        
  
            <!-- ACTS -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="w-5 h-5 rounded-full border border-[#c8ff00] flex items-center justify-center text-[8px] text-[#c8ff00] font-mono">Q</div>
                <span class="text-[10px] text-[#c8ff00] font-mono tracking-wider">MAX-Q AI</span>
              </div>
  
              <p class="text-xs text-gray-400 mb-3">
                Select a section to explore recommended cuts.
              </p>
  
              <div class="space-y-2 ml-6">
              <!-- selectors-->
               
               <KeyframeGroupSelector v-model:acts="acts" :select-act="selectAct" :selected-act="selectedAct" />

              </div>
            </div>
          </div>
  
          <!-- FOOTER -->
          <div class="p-4 border-t border-white/10">
            <button class="w-full text-xs border border-white/10 p-2 flex items-center gap-2 hover:border-[#c8ff00]/40">
              <span>Do another search</span>
            </button>
          </div>
        </div>
  
        <!-- RIGHT PANEL -->
        <div class="flex-1 flex flex-col">
          <!-- VIEWPORT -->
          <div class="flex-1 flex items-center justify-center bg-black relative">
            <div class="text-center opacity-30 text-xs font-mono">FILM PREVIEW</div>
  
            <!-- ANNOTATION -->
            <div
              v-if="hoveredKf !== null"
              class="absolute bottom-20 bg-[#0d0d0d] border border-white/10 border-l-2 border-[#c8ff00] p-3 w-[260px]"
            >
              <div class="text-xs text-gray-300">{{ activeAnnotation.text }}</div>
              <div class="flex justify-between mt-2 text-[10px] text-gray-500">
                <span>{{ activeAnnotation.tc }}</span>
                <div class="flex gap-1">
                  <button @click="prevKf">←</button>
                  <button @click="nextKf">→</button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- TIMELINE -->
          <div class="border-t border-white/10 bg-[#111]">
            <div class="h-1 bg-white/5">
              <div class="h-full bg-gradient-to-r from-purple-600 to-lime-400" :style="{ width: selectedAct ? '100%' : '0%' }"></div>
            </div>
  
            <div class="px-5 py-3">
              <div
                class="relative h-[2px] bg-white/10 cursor-pointer"
                ref="trackEl"
                @click="seekTimeline"
              >
                <div class="absolute h-full bg-gradient-to-r from-purple-600 to-lime-400" :style="{ width: progressPct + '%' }"></div>
  
                <div
                  class="absolute top-1/2 w-2 h-2 bg-[#c8ff00] rounded-full -translate-y-1/2"
                  :style="{ left: progressPct + '%' }"
                ></div>
  
                <!-- KEYFRAMES -->
                <div
                  v-for="(kf, i) in currentKeyframes"
                  :key="i"
                  class="absolute top-1/2 -translate-y-1/2"
                  :style="{ left: kf.pct + '%' }"
                  @mouseenter="hoverKf(i)"
                  @mouseleave="leaveKf"
                >
                  <div class="w-2 h-2 rotate-45 bg-gray-500 hover:bg-[#c8ff00]"></div>
                </div>
              </div>
            </div>
  
            <!-- CONTROLS -->
            <div class="flex justify-center items-center gap-3 pb-3">
              <button @click="togglePlay" class="text-xs border border-white/10 px-2 py-1">
                {{ playing ? 'Pause' : 'Play' }}
              </button>
              <span class="text-[10px] font-mono text-gray-500">{{ timecode }}</span>
            </div>
          </div>
        </div>
      </div>

  </template>
  
