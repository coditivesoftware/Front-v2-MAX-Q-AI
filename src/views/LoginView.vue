<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

let ctx

onMounted(async () => {
  const { gsap } = await import('gsap')
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.login-grid', { opacity: 0, duration: 2 })
      .from('.login-logo', { opacity: 0, scale: 0.8, duration: 1 }, '-=1.5')
      .from('.login-title', { opacity: 0, y: 30, duration: 0.7 }, '-=0.6')
      .from('.login-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.login-field', { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, '-=0.2')
      .from('.login-footer', { opacity: 0, duration: 0.6 }, '-=0.2')
  })
})

onUnmounted(() => ctx?.revert())

async function handleLogin() {
  if (!email.value.trim() || !password.value.trim()) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    await login(email.value.trim(), password.value.trim())
    router.push({ name: 'admin-projects' })
  } catch (err) {
    const data = err.response?.data
    if (data?.detail) {
      errorMessage.value = data.detail
    } else if (data?.email) {
      errorMessage.value = data.email[0]
    } else if (data?.password) {
      errorMessage.value = data.password[0]
    } else {
      errorMessage.value = 'Error de conexion con el servidor'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden">

    <!-- Grid background -->
    <div class="login-grid absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="login-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#login-grid)" />
      </svg>
    </div>

    <!-- Geometric accent -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" aria-hidden="true">
      <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="200" y="200" width="400" height="400" stroke="#ffffff" stroke-width="0.5" transform="rotate(45 400 400)" />
        <rect x="150" y="150" width="500" height="500" stroke="#ffffff" stroke-width="0.3" transform="rotate(45 400 400)" />
        <rect x="250" y="250" width="300" height="300" stroke="#ffffff" stroke-width="0.5" transform="rotate(45 400 400)" />
      </svg>
    </div>

    <!-- Corner labels -->
    <span class="hidden md:block absolute top-6 left-6 text-[#2a2a2a] text-[9px] tracking-widest uppercase mono">
      SYS://AUTH_GATEWAY
    </span>
    <span class="hidden md:block absolute bottom-6 right-6 text-[#2a2a2a] text-[9px] tracking-widest uppercase mono">
      MAX-Q IA // V0.1.2
    </span>

    <!-- Login card -->
    <div class="relative z-10 w-full max-w-sm px-6">

      <div class="login-logo flex justify-center mb-12">
        <img src="@/assets/logos/max-q-logo.png" alt="MAX-Q" class="w-16 h-16" />
      </div>

      <h1 class="login-title text-center text-white text-3xl font-black tracking-tight mb-3" style="font-family: AlvaradoVar, sans-serif;">
        Access Terminal
      </h1>
      <p class="login-subtitle text-center text-[#4a4a4a] text-xs tracking-widest uppercase mb-10 mono">
        Authenticate to continue
      </p>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">

        <div class="login-field flex flex-col gap-1.5">
          <label class="text-[10px] tracking-widest uppercase text-[#4a4a4a] mono">Email</label>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="operator@maxq.ai"
            :disabled="isLoading"
            class="bg-[#0a0a0a] border border-[#1f1f1f] text-[#dddddd] text-sm px-4 py-3 rounded-none outline-none transition-colors duration-200
              placeholder:text-[#2a2a2a]
              focus:border-[#4a4a4a]
              disabled:opacity-40"
          />
        </div>

        <div class="login-field flex flex-col gap-1.5">
          <label class="text-[10px] tracking-widest uppercase text-[#4a4a4a] mono">Password</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••••••"
            :disabled="isLoading"
            class="bg-[#0a0a0a] border border-[#1f1f1f] text-[#dddddd] text-sm px-4 py-3 rounded-none outline-none transition-colors duration-200
              placeholder:text-[#2a2a2a]
              focus:border-[#4a4a4a]
              disabled:opacity-40"
          />
        </div>

        <p v-if="errorMessage" class="text-xs text-[var(--color-on-error)]">{{ errorMessage }}</p>

        <button
          type="submit"
          :disabled="isLoading || !email.trim() || !password.trim()"
          class="login-btn-css mt-2 bg-white text-black font-bold text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200
            hover:bg-[#dddddd] hover:cursor-pointer
            disabled:opacity-40 disabled:cursor-default disabled:hover:bg-white"
        >
          <span v-if="!isLoading">Initialize Session</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-20" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
            Authenticating
          </span>
        </button>
      </form>

      <div class="login-footer mt-10 flex justify-center">
        <span class="text-[#1f1f1f] text-[9px] tracking-widest uppercase mono">
          Secure connection established
        </span>
      </div>
    </div>

    <!-- Scan line -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.015]" aria-hidden="true">
      <div class="absolute w-full h-px bg-white animate-scan" />
    </div>
  </div>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}

@keyframes scan {
  0% { top: -2%; }
  100% { top: 102%; }
}

.animate-scan {
  animation: scan 8s linear infinite;
}

.login-btn-css {
  animation: fadeInUp 0.5s ease-out 1.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
