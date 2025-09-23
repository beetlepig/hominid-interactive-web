<script>
	import { createSignal } from '$lib/utils';
	import { Canvas } from '@threlte/core';
	import { inView } from 'motion';
	import { WebGPURenderer } from 'three/webgpu';

	const { children } = $props();

	/** @type {HTMLDivElement | null} */
	let canvasContainerRef = $state(null);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

	/**
	 * Create a Three.js WebGPU renderer bound to the provided canvas.
	 *
	 * @param {HTMLCanvasElement} canvas - The HTML canvas element to render into.
	 * @returns {WebGPURenderer} - A configured WebGPURenderer instance.
	 */
	const createRenderer = (canvas) => {
		return new WebGPURenderer({
			canvas,
			antialias: true,
			forceWebGL: false
		});
	};

	$effect(() => {
		const canvasParentElement = canvasContainerRef?.parentElement;

		if (canvasParentElement) {
			const stop = inView(
				canvasParentElement,
				() => {
					setCanvasRenderMode('on-demand');

					return () => {
						setCanvasRenderMode('manual');
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<div bind:this={canvasContainerRef} class="contents">
	<Canvas {createRenderer} renderMode={canvasRenderMode()}>
		{@render children?.()}
	</Canvas>
</div>
