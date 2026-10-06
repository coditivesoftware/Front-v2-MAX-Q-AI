<script setup>
const props = defineProps(['acts'])
</script>


<template>
    <button
        v-for="act in acts"
        :key="act.id"
        @click="selectAct(props.act.id)"
        :class="[
        'w-full text-left p-2 border rounded',
        selectedAct === act.id
            ? 'border-[#c8ff00] bg-[#c8ff00]/10'
            : 'border-white/10 hover:border-[#c8ff00]/40 hover:bg-[#c8ff00]/5'
        ]"
        >
        <div class="text-xs font-medium">{{ props.act.label }}</div>
        <div class="text-[10px] text-gray-500 font-mono">
        {{ props.act.kfCount }} keyframes
        </div>
</button>
</template>

