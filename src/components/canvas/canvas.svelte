<script>
	/** @import {Snippet} from "svelte" */
	import {
		WebGPURenderer,
		MeshStandardNodeMaterial,
		Mesh,
		PolyhedronGeometry,
		PointLight,
		PerspectiveCamera,
		PlaneGeometry
	} from 'three/webgpu';
	import { Canvas, extend } from '@threlte/core';
	import { inView } from 'motion';

	import { createSignal } from '$lib/utils';

	extend({
		MeshStandardNodeMaterial,
		Mesh,
		PolyhedronGeometry,
		PointLight,
		PerspectiveCamera,
		PlaneGeometry
	});

	/**
	 * @typedef {object} CanvasProps
	 * @property {string} [data-testid] - Canvas testid.
	 * @property {Snippet} [children] - Children slot snippet.
	 */

	/** @type {CanvasProps} */
	const { children, 'data-testid': testid } = $props();

	/** @type {HTMLDivElement | null} */
	let canvasContainerRef = $state(null);
	let isRendererReady = $state(false);
	let isInView = $state(false);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

	/** @param {{ canvas: HTMLCanvasElement }} ctx */
	const createRenderer = ({ canvas }) => {
		const renderer = new WebGPURenderer({ canvas, antialias: true, forceWebGL: false });

		renderer.init().then(() => {
			isRendererReady = true;
			console.log('Renderer backend:', navigator.gpu ? 'WebGPU' : 'WebGL (fallback)');
		});

		return renderer;
	};

	$effect(() => {
		if (isRendererReady && isInView) {
			setCanvasRenderMode('on-demand');
		}
	});

	$effect(() => {
		const canvasParentElement = canvasContainerRef?.parentElement;

		if (canvasParentElement) {
			const stop = inView(
				canvasParentElement,
				() => {
					isInView = true;

					if (isRendererReady) {
						setCanvasRenderMode('on-demand');
					}

					return () => {
						isInView = false;
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
	<Canvas renderMode={canvasRenderMode()} {createRenderer}>
		{@render children?.()}
	</Canvas>
</div>
