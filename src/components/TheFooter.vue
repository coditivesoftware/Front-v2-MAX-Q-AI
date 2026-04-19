<script setup>
const footerLinks = ['PROTOCOL', 'STATUS', 'PRIVACY']
</script>

<template>
  <footer class="bg-[#0a0a0a] border-t border-[#2a2a2a]">
    <div class="max-w-screen-xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <!-- Logo -->
      <span class="text-white font-black text-sm tracking-widest uppercase">
        ORBITAL AUTHORITY
      </span>

      <!-- Copyright -->
      <p class="text-[#3a3a3a] text-[10px] tracking-widest uppercase mono text-center">
        &copy; 2024 ORBITAL AUTHORITY. ALL SYSTEMS OPERATIONAL.
      </p>

      <!-- Footer links -->
      <ul class="flex items-center gap-8">
        <li v-for="link in footerLinks" :key="link">
          <a
            href="#"
            class="text-[#6b6b6b] text-[10px] tracking-widest uppercase mono hover:text-white transition-colors duration-200"
          >
            {{ link }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.mono {
  font-family: 'Space Mono', monospace;
}
</style>
