<script>
	/** @import {Snippet} from "svelte" */
	import { Canvas, extend } from '@threlte/core';
	import { inView } from 'motion';

	import { createSignal } from '$lib/utils';

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
	let isWebGPUModuleLoaded = $state(false);

	/** @type {((ctx: { canvas: HTMLCanvasElement }) => import('three').WebGLRenderer) | undefined} */
	let createRenderer = $state(undefined);

	const [canvasRenderMode, setCanvasRenderMode] =
		/** @type {typeof createSignal<'always' | 'on-demand' | 'manual'>} */ (createSignal)('manual');

	// Dynamic import of three/webgpu to keep bundle under 50KB gzipped budget.
	// The TSL node system pulled in by 'three/webgpu' is deferred until the canvas mounts.
	async function loadWebGPUModules() {
		const {
			WebGPURenderer,
			MeshStandardNodeMaterial,
			Mesh,
			PolyhedronGeometry,
			PointLight,
			PerspectiveCamera,
			PlaneGeometry
		} = await import('three/webgpu');

		extend({
			MeshStandardNodeMaterial,
			Mesh,
			PolyhedronGeometry,
			PointLight,
			PerspectiveCamera,
			PlaneGeometry
		});

		/** @param {{ canvas: HTMLCanvasElement }} ctx */
		createRenderer = ({ canvas }) => {
			const renderer = new WebGPURenderer({ canvas, antialias: true, forceWebGL: false });

			renderer
				.init()
				.then(() => {
					isRendererReady = true;
					const isWebGPU = renderer.backend?.isWebGPUBackend === true;
					console.log('Renderer backend:', isWebGPU ? 'WebGPU' : 'WebGL (fallback)');
				})
				.catch((err) => {
					console.error('WebGPU init failed, falling back:', err);
					isRendererReady = true;
				});

			return renderer;
		};

		isWebGPUModuleLoaded = true;
	}

	$effect(() => {
		if (canvasContainerRef && !isWebGPUModuleLoaded) {
			loadWebGPUModules();
		}
	});

	$effect(() => {
		if (isRendererReady) {
			setCanvasRenderMode(isInView ? 'on-demand' : 'manual');
		}
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

<div
	bind:this={canvasContainerRef}
	class="contents"
	style:visibility={isRendererReady ? 'visible' : 'hidden'}
	data-testid={testid}
>
	{#if isWebGPUModuleLoaded && createRenderer}
		<Canvas renderMode={canvasRenderMode()} {createRenderer}>
			{@render children?.()}
		</Canvas>
	{/if}
</div>
