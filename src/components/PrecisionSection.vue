<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const transcriptLines = [
	{ time: '01:24:08', speaker: '[CHARACTER A]', text: "We weren't supposed to be here until the orbital window cleared.", active: false },
	{ time: '01:24:10', speaker: '[CHARACTER B]', text: 'The window is open now. Initialize the sequence.', active: false },
	{ time: '01:24:12', speaker: '[CHARACTER A]', text: 'Understood. Max-Q in T-minus 10 seconds.', active: true },
]

let ctx

onMounted(() => {
	ctx = gsap.context(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.precision-section',
				start: 'top 75%',
			},
			defaults: { ease: 'power3.out' },
		})

		tl.from('.precision-title', { opacity: 0, y: 40, duration: 0.7 })
			.from('.precision-text', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
			.from('.precision-panel', { opacity: 0, y: 40, scale: 0.98, duration: 0.8 }, '-=0.2')
			.from('.transcript-line', { opacity: 0, x: 20, stagger: 0.15, duration: 0.4 }, '-=0.3')
	})
})

onUnmounted(() => ctx?.revert())
</script>

<template>
	<section class="precision-section bg-[#0a0a0a] py-24 md:py-32">
		<div class="max-w-screen-xl mx-auto px-6 md:px-16">
			<div class="mb-16">
				<h2 class="title text-white font-black text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
					Precision film production demands.
				</h2>
				<p class="precision-text text-[#6b6b6b] text-base leading-relaxed max-w-2xl">
					MAX-Q AI transcribes your footage with the precision required for theatrical release. You keep
					creative control. The AI handles every word.
				</p>
			</div>

			<!-- Video + Transcript panel -->
			<div class="precision-panel">
				<img src="/src/img/landing/PAN 1.png" alt="Precision panel" class="w-full h-full object-cover">
			</div>
		</div>
	</section>
</template>

<style scoped>
.mono {
	font-family: 'Space Mono', monospace;
}
</style>
