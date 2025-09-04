<script>
	import { createSignal, mapNumRange } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import PolyhedronScene from '../../molecules/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { inView, scroll } from 'motion';
	import { css } from 'styled-system/css';
	import { Tween } from 'svelte/motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let headlineContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let headlineHeadingRef = $state(null);

	/** @type {HTMLElement | null} */
	let headlineCanvasContainerRef = $state(null);

	/** @type {number | null} */
	let sectionWidth = $state(null);
	const smBreakPoint = $derived((sectionWidth ?? 0) <= 768);

	const animatedOpacity = new Tween(0.9, { delay: 20, duration: 200 });
	const animatedPosition = new Tween(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = new Tween(0, { delay: 20, duration: 200 });
	const animatedNamePosition = new Tween(0, { delay: 20, duration: 200 });

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

	const [canvasHeadlineRender, setCanvasHeadlineRender] =
		/** @type {typeof createSignal<boolean>} */ (createSignal)(false);

	$effect(() => {
		/** @type {(progress: number) => void} */
		const scrollCallback = (progress) => {
			setScrollYProgress(progress);
		};
		scroll(scrollCallback, {
			container: document.getElementById('main-target') ?? undefined,
			target: headlineContainerRef ?? undefined
		});
	});

	$effect(() => {
		if (headlineHeadingRef) {
			const stop = inView(
				headlineHeadingRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (headlineCanvasContainerRef) {
			const stop = inView(
				headlineCanvasContainerRef,
				() => {
					setCanvasHeadlineRender(true);

					return () => {
						setCanvasHeadlineRender(false);
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		const opacity = mapNumRange(scrollYProgress(), 0.05, 0.25, 0.9, 0);
		const position = mapNumRange(scrollYProgress(), 0, 0.25, 0, -40);
		const nameOpacity = mapNumRange(scrollYProgress(), 0.25, 0.35, 0, 0.9);
		const namePosition = mapNumRange(scrollYProgress(), 0.3, 0.35, 0, -25);

		animatedOpacity.target = opacity;
		animatedPosition.target = position;
		animatedNameOpacity.target = nameOpacity;
		animatedNamePosition.target = namePosition;
	});
</script>

<section
	id={sections.home.id}
	bind:this={headlineContainerRef}
	bind:clientWidth={sectionWidth}
	class={css({ height: '[250dvh]', bgColor: 'gray.50' })}
>
	<div
		class={css({
			position: 'sticky',
			display: 'flex',
			top: '0',
			flexDir: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: '[100vh]'
		})}
	>
		<div
			bind:this={headlineCanvasContainerRef}
			class={css({
				pos: 'absolute',
				inset: '0'
			})}
		>
			{#if canvasHeadlineRender()}
				<Canvas>
					<PolyhedronScene
						{smBreakPoint}
						{headlineContainerRef}
						projectName="Headline"
						targetAnimationSection={AnimationSectionEnum.Pyramid}
					/>
				</Canvas>
			{/if}
		</div>
		<h1
			bind:this={headlineHeadingRef}
			style="opacity: {animatedOpacity.current}; transform: translateY({animatedPosition.current}px)"
			class={css({
				position: 'absolute',
				pointerEvents: 'none',
				textAlign: 'center',
				fontFamily: 'raleway',
				fontWeight: 'black',
				fontSize: '7xl',
				lineHeight: 'tight',
				md: {
					fontSize: '8xl'
				}
			})}
		>
			CARLOS <br /> GOMEZ
		</h1>
		<h2
			style="opacity: {animatedNameOpacity.current}; transform: translateY({animatedNamePosition.current}px)"
			class={css({
				position: 'absolute',
				pointerEvents: 'none',
				textAlign: 'left',
				fontFamily: 'oswald',
				lineHeight: 'tight',
				fontSize: 'lg'
			})}
		>
			{m.headline_developer()} <br />
			<span
				class={css({
					fontSize: '6xl',
					fontWeight: 'medium'
				})}>{m.headline_portfolio()}</span
			>
		</h2>
	</div>
</section>
