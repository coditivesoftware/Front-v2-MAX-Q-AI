<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { listProjects, createProject } from '@/api/projects'

const router = useRouter()

const projects = ref([])
const isLoadingList = ref(true)
const listError = ref(null)

const newName = ref('')
const newDescription = ref('')
const isCreating = ref(false)
const createError = ref(null)

const selectedId = ref(null)

let ctx

onMounted(async () => {
  await fetchProjects()

  const { gsap } = await import('gsap')
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.proj-header', { opacity: 0, y: 20, duration: 0.6 })
      .from('.proj-left', { opacity: 0, x: -20, duration: 0.5 }, '-=0.3')
      .from('.proj-right', { opacity: 0, x: 20, duration: 0.5 }, '-=0.4')
  })
})

onUnmounted(() => ctx?.revert())

async function fetchProjects() {
  isLoadingList.value = true
  listError.value = null
  try {
    const { data } = await listProjects()
    projects.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    listError.value = err.response?.data?.detail || 'Error al cargar proyectos'
  } finally {
    isLoadingList.value = false
  }
}

function selectProject(project) {
  selectedId.value = project.id
  router.push({ name: 'admin-upload', query: { project: project.id } })
}

async function handleCreate() {
  if (!newName.value.trim()) return
  isCreating.value = true
  createError.value = null
  try {
    const { data } = await createProject({
      name: newName.value.trim(),
      description: newDescription.value.trim() || undefined,
    })
    router.push({ name: 'admin-upload', query: { project: data.id } })
  } catch (err) {
    createError.value = err.response?.data?.detail || 'Error al crear proyecto'
  } finally {
    isCreating.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="flex flex-col flex-1 bg-[#030303] min-h-screen">

    <!-- Header -->
    <div class="proj-header px-10 pt-10 pb-6 border-b border-[#1a1a1a]">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-[9px] tracking-widest uppercase text-[#2a2a2a] mono">SYS://PROJECT_SELECT</span>
      </div>
      <h1 class="text-3xl font-black tracking-tight text-white" style="font-family: AlvaradoVar, sans-serif;">
        Projects
      </h1>
      <p class="text-xs text-[#4a4a4a] mt-2 mono">Select an existing project or initialize a new one</p>
    </div>

    <!-- Split layout -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">

      <!-- Left: project list -->
      <div class="proj-left flex flex-col">
        <div class="px-10 py-6 border-b border-[#1a1a1a]">
          <span class="text-[10px] tracking-widest uppercase text-[#3a3a3a] mono">Existing Projects</span>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingList" class="flex-1 flex items-center justify-center">
          <span class="text-[10px] tracking-widest uppercase text-[#2a2a2a] mono animate-pulse">Loading...</span>
        </div>

        <!-- Error -->
        <div v-else-if="listError" class="px-10 py-8">
          <p class="text-xs text-[var(--color-on-error)]">{{ listError }}</p>
          <button @click="fetchProjects" class="mt-3 text-[10px] tracking-widest uppercase text-[#4a4a4a] hover:text-white transition-colors mono">
            Retry
          </button>
        </div>

        <!-- Empty -->
        <div v-else-if="projects.length === 0" class="flex-1 flex flex-col items-center justify-center px-10 gap-3">
          <svg class="w-8 h-8 text-[#1f1f1f]" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <span class="text-[10px] tracking-widest uppercase text-[#2a2a2a] mono">No projects yet</span>
        </div>

        <!-- Project list -->
        <div v-else class="flex-1 overflow-y-auto">
          <button
            v-for="project in projects"
            :key="project.id"
            @click="selectProject(project)"
            class="w-full text-left px-10 py-4 border-b border-[#111111] transition-all duration-200 group
              hover:bg-[#0a0a0a]"
            :class="selectedId === project.id ? 'bg-[#0a0a0a] border-l-2 border-l-white' : 'border-l-2 border-l-transparent'"
          >
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-sm text-[#dddddd] group-hover:text-white transition-colors">{{ project.name }}</span>
                <span v-if="project.description" class="text-[10px] text-[#3a3a3a] truncate max-w-xs">{{ project.description }}</span>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span class="text-[9px] tracking-widest uppercase text-[#2a2a2a] mono">{{ formatDate(project.created_at) }}</span>
                <span class="text-[9px] tracking-widest uppercase mono"
                  :class="project.id === selectedId ? 'text-white' : 'text-[#1f1f1f] group-hover:text-[#3a3a3a]'"
                >
                  ID:{{ project.id }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Divider -->
      <div class="hidden md:block bg-[#1a1a1a]" />

      <!-- Right: create new -->
      <div class="proj-right flex flex-col">
        <div class="px-10 py-6 border-b border-[#1a1a1a]">
          <span class="text-[10px] tracking-widest uppercase text-[#3a3a3a] mono">Initialize New Project</span>
        </div>

        <div class="px-10 py-8 flex flex-col gap-6 flex-1">

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] tracking-widest uppercase text-[#4a4a4a] mono">Project Name</label>
            <input
              v-model="newName"
              type="text"
              placeholder="Atardecer en el Valle"
              :disabled="isCreating"
              class="bg-[#0a0a0a] border border-[#1f1f1f] text-[#dddddd] text-sm px-4 py-3 rounded-none outline-none transition-colors duration-200
                placeholder:text-[#2a2a2a]
                focus:border-[#4a4a4a]
                disabled:opacity-40"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] tracking-widest uppercase text-[#4a4a4a] mono">
              Description
              <span class="normal-case text-[#2a2a2a]">(optional)</span>
            </label>
            <textarea
              v-model="newDescription"
              placeholder="Detalles sobre el proyecto..."
              rows="3"
              :disabled="isCreating"
              class="bg-[#0a0a0a] border border-[#1f1f1f] text-[#dddddd] text-sm px-4 py-3 rounded-none outline-none transition-colors duration-200 resize-none
                placeholder:text-[#2a2a2a]
                focus:border-[#4a4a4a]
                disabled:opacity-40"
            />
          </div>

          <p v-if="createError" class="text-xs text-[var(--color-on-error)]">{{ createError }}</p>

          <button
            @click="handleCreate"
            :disabled="isCreating || !newName.trim()"
            class="create-btn mt-2 bg-white text-black font-bold text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200
              hover:bg-[#dddddd] hover:cursor-pointer
              disabled:opacity-30 disabled:cursor-default disabled:hover:bg-white"
          >
            <span v-if="!isCreating">Create Project</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-20" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
              Initializing
            </span>
          </button>

          <!-- Visual separator -->
          <div class="flex-1 flex flex-col justify-end pb-4">
            <div class="border-t border-[#111111] pt-4 flex items-center gap-2">
              <svg class="w-3 h-3 text-[#1f1f1f]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              <span class="text-[9px] tracking-widest uppercase text-[#1f1f1f] mono">
                A project groups all media assets and transcriptions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
