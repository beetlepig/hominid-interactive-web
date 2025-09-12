<script>
	import { createSignal } from '$lib';
	import { Canvas } from '@threlte/core';
	import { inView } from 'motion';
	import { WebGPURenderer } from 'three/webgpu';

	const { children } = $props();

	/** @type {HTMLDivElement | null} */
	let canvasContainerRef = $state(null);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

	/**
	 * @param {HTMLCanvasElement} canvas
	 * @returns {WebGPURenderer}
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
