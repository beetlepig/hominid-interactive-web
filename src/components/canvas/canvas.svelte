<script>
	import { createSignal } from '$lib/utils';
	import { Canvas } from '@threlte/core';
	import { inView } from 'motion';

	const { children } = $props();

	/** @type {HTMLDivElement | null} */
	let canvasContainerRef = $state(null);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

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
	<Canvas renderMode={canvasRenderMode()}>
		{@render children?.()}
	</Canvas>
</div>
