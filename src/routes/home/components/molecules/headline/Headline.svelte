<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { createSignal, mapNumRange } from '$lib';
	import { tweened } from 'svelte/motion';
	import { sections } from '$lib/constans/index.js';
	import PolyhedronScene from '../../organisms/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../organisms/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { scroll } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let headlineContainerRef = $state(null);

	const animatedOpacity = tweened(0.9, { delay: 20, duration: 200 });
	const animatedPosition = tweened(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = tweened(0, { delay: 20, duration: 200 });
	const animatedNamePosition = tweened(0, { delay: 20, duration: 200 });

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

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
		const opacity = mapNumRange(scrollYProgress(), 0.2, 0.25, 0.9, 0);
		const position = mapNumRange(scrollYProgress(), 0.15, 0.25, 0, -40);
		const nameOpacity = mapNumRange(scrollYProgress(), 0.25, 0.35, 0, 0.9);
		const namePosition = mapNumRange(scrollYProgress(), 0.3, 0.35, 0, -25);

		animatedOpacity.update(() => opacity);
		animatedPosition.update(() => position);
		animatedNameOpacity.update(() => nameOpacity);
		animatedNamePosition.update(() => namePosition);
	});
</script>

<div
	id={sections.home.id}
	use:interceptionObserverAction={{
		onIntercepted: onVisible,
		threshold: [0.2]
	}}
	bind:this={headlineContainerRef}
	class={css({ height: '[500vh]', bgColor: 'gray.50' })}
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
			class={css({
				pos: 'absolute',
				inset: '0'
			})}
		>
			<Canvas>
				<PolyhedronScene
					{headlineContainerRef}
					projectName="main"
					targetAnimationSection={AnimationSectionEnum.Pyramid}
				/>
			</Canvas>
		</div>
		<h1
			style="opacity: {$animatedOpacity}; transform: translateY({$animatedPosition}px)"
			class={css({
				position: 'absolute',
				textAlign: 'center',
				fontFamily: 'raleway',
				fontWeight: 'black',
				fontSize: '7xl',
				lineHeight: 'tight',
				animationName: 'fadein',
				animationDuration: 'slowest',
				animationTimingFunction: 'in',
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
				textAlign: 'left',
				fontFamily: 'oswald',
				lineHeight: 'tight',
				fontSize: 'lg'
			})}
		>
			Developer's <br />
			<span class={css({ fontSize: '6xl', fontWeight: 'medium' })}>PORTFOLIO</span>
		</h2>
	</div>
</div>
