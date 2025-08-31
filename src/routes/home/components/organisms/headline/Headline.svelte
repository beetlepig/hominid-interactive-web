<script>
	import { createSignal, mapNumRange } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import PolyhedronScene from '../../molecules/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { inView, scroll } from 'motion';
	import { css } from 'styled-system/css';
	import { tweened } from 'svelte/motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let headlineContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let headlineHeadingRef = $state(null);

	/** @type {HTMLElement | null} */
	let headlineCanvasContainerRef = $state(null);

	const animatedOpacity = tweened(0.9, { delay: 20, duration: 200 });
	const animatedPosition = tweened(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = tweened(0, { delay: 20, duration: 200 });
	const animatedNamePosition = tweened(0, { delay: 20, duration: 200 });

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

	const [canvasHeadlineRenderMode, setCanvasHeadlineRenderMode] =
		/** @type {typeof createSignal<'on-demand' | 'manual'>} */ (createSignal)('manual');

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
					setCanvasHeadlineRenderMode('on-demand');

					return () => {
						setCanvasHeadlineRenderMode('manual');
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

		animatedOpacity.update(() => opacity);
		animatedPosition.update(() => position);
		animatedNameOpacity.update(() => nameOpacity);
		animatedNamePosition.update(() => namePosition);
	});
</script>

<section
	id={sections.home.id}
	bind:this={headlineContainerRef}
	class={css({ height: '[300dvh]', bgColor: 'gray.50' })}
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
			<Canvas renderMode={canvasHeadlineRenderMode()}>
				<PolyhedronScene
					{headlineContainerRef}
					projectName="Headline"
					targetAnimationSection={AnimationSectionEnum.Pyramid}
				/>
			</Canvas>
		</div>
		<h1
			bind:this={headlineHeadingRef}
			style="opacity: {$animatedOpacity}; transform: translateY({$animatedPosition}px)"
			class={css({
				position: 'absolute',
				pointerEvents: 'none',
				textAlign: 'center',
				fontFamily: 'raleway',
				fontWeight: 'black',
				fontSize: '6xl',
				lineHeight: 'tight',
				md: {
					fontSize: '8xl'
				}
			})}
		>
			CARLOS <br /> GOMEZ
		</h1>
		<h2
			style="opacity: {$animatedNameOpacity}; transform: translateY({$animatedNamePosition}px)"
			class={css({
				position: 'absolute',
				pointerEvents: 'none',
				textAlign: 'left',
				fontFamily: 'oswald',
				lineHeight: 'tight',
				fontSize: 'md',
				md: {
					fontSize: 'lg'
				}
			})}
		>
			Developer's <br />
			<span
				class={css({
					fontSize: '5xl',
					fontWeight: 'medium',
					md: {
						fontSize: '6xl'
					}
				})}>PORTFOLIO</span
			>
		</h2>
	</div>
</section>
