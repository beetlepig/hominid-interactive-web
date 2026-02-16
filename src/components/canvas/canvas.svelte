<script>
	/** @import {Snippet} from "svelte" */
	/** @import {WebGPURenderer as WebGPURendererType} from "three/webgpu" */
	/** @import {WebGLRenderer as WebGLRendererType} from "three" */
	import { cn, createSignal } from '$lib/utils';
	import { Canvas, extend } from '@threlte/core';
	import { inView } from 'motion';
	import {
		WebGPURenderer,
		MeshStandardNodeMaterial,
		Mesh,
		PolyhedronGeometry,
		PointLight,
		PerspectiveCamera,
		PlaneGeometry
	} from 'three/webgpu';

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
	 * @property {Snippet} [children] - Children slot snippet.
	 */

	/** @type {CanvasProps} */
	const { children } = $props();

	/** @type {HTMLDivElement | null} */
	let canvasContainerRef = $state(null);
	let isRendererReady = $state(false);
	let isInView = $state(false);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

	/**
	 * @type {((canvas: HTMLCanvasElement) => WebGPURendererType | WebGLRendererType)
	 * 	| undefined}
	 */
	const createRenderer = (canvas) => {
		const renderer = new WebGPURenderer({ canvas, antialias: true, forceWebGL: false });

		renderer
			.init()
			.then(() => {
				isRendererReady = true;
				console.log(
					'Renderer backend:',
					'isWebGPUBackend' in renderer.backend ? 'WebGPU' : 'WebGL'
				);
			})
			.catch((err) => {
				console.error('WebGPU init failed, falling back:', err);
				isRendererReady = true;
			});

		return renderer;
	};

	$effect(() => {
		setCanvasRenderMode(isInView && isRendererReady ? 'on-demand' : 'manual');
	});

	$effect(() => {
		const canvasParentElement = canvasContainerRef?.parentElement;

		if (canvasParentElement) {
			const stop = inView(
				canvasParentElement,
				() => {
					isInView = true;

					return () => {
						isInView = false;
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

<div bind:this={canvasContainerRef} class={cn(isRendererReady ? 'contents' : 'hidden')}>
	<Canvas renderMode={canvasRenderMode()} {createRenderer}>
		{@render children?.()}
	</Canvas>
</div>
