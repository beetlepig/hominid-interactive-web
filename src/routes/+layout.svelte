<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<main class="mx-auto max-w-7xl px-6 pb-12 pt-[10svh]">
	<div class="pointer-events-none relative z-20 h-[500vh]">
		<div class="fixed left-0 top-0 z-10 h-[100lvh] w-screen">
			<Canvas colorSpace="display-p3" useLegacyLights={false}>
				<Scene />
			</Canvas>
		</div>

		<slot />
	</div>
</main>
