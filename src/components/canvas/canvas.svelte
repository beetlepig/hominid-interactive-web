<script>
	/** @import {Snippet} from "svelte" */
	import { createSignal } from '$lib/utils';
	import { Canvas } from '@threlte/core';
	import { inView } from 'motion';

	/**
	 * @typedef {object} CanvasProps
	 * @property {string} [data-testid] - Canvas testid.
	 * @property {Snippet} [children] - Children slot snippet.
	 */

	/** @type {CanvasProps} */
	const { children, 'data-testid': testid } = $props();

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

<div bind:this={canvasContainerRef} class="contents" data-testid={testid}>
	<Canvas renderMode={canvasRenderMode()}>
		{@render children?.()}
	</Canvas>
</div>
