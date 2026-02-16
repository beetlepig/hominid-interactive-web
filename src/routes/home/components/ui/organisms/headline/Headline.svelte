<script>
	import { Canvas } from '$components/canvas/index.js';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { createSignal, mapNumRange } from '$lib/utils/index.js';
	import { PolyhedronScene, AnimationSectionEnum } from '../../../polyhedron-scene';
	import ChevronsDownIcon from '@lucide/svelte/icons/chevrons-down';
	import { inView, scroll } from 'motion';
	import { animate } from 'motion';
	import { setContext } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let headlineContainerRef = $state(null);

	setContext('headlineContainerRef', () => headlineContainerRef);

	/** @type {HTMLElement | null} */
	let headlineHeadingRef = $state(null);

	/** @type {HTMLElement | null} */
	let scrollIconRef = $state(null);

	const [scrollIconVisible, setScrollIconVisible] = createSignal(true);

	const animatedOpacity = new Tween(0.9, { delay: 20, duration: 200 });
	const animatedPosition = new Tween(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = new Tween(0, { delay: 20, duration: 200 });
	const animatedNamePosition = new Tween(0, { delay: 20, duration: 200 });

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

	$effect(() => {
		/** @type {(progress: number) => void} */
		const scrollCallback = (progress) => {
			setScrollYProgress(progress);

			if (progress > 0.1) {
				setScrollIconVisible(false);
			}
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
		const opacity = mapNumRange(scrollYProgress(), 0.05, 0.25, 0.9, 0);
		const position = mapNumRange(scrollYProgress(), 0, 0.25, 0, -40);
		const nameOpacity = mapNumRange(scrollYProgress(), 0.25, 0.35, 0, 0.9);
		const namePosition = mapNumRange(scrollYProgress(), 0.3, 0.35, 0, -25);

		animatedOpacity.target = opacity;
		animatedPosition.target = position;
		animatedNameOpacity.target = nameOpacity;
		animatedNamePosition.target = namePosition;
	});

	$effect(() => {
		if (scrollIconRef) {
			const animation = animate(
				scrollIconRef,
				{ y: [-10, 0, -10] },
				{ repeat: Infinity, duration: 2 }
			);

			return () => {
				animation.cancel();
			};
		}
	});
</script>

<section id={sections.home.id} bind:this={headlineContainerRef} class="h-[250dvh] bg-gray-50">
	<div class="sticky top-0 flex h-dvh flex-col items-center justify-center">
		<div class="absolute inset-0">
			<Canvas>
				<PolyhedronScene
					projectName="Headline"
					targetAnimationSection={AnimationSectionEnum.Pyramid}
				/>
			</Canvas>
		</div>
		<h1
			bind:this={headlineHeadingRef}
			style="opacity: {animatedOpacity.current}; transform: translateY({animatedPosition.current}px)"
			class="pointer-events-none absolute text-center font-raleway text-7xl leading-24 font-black md:text-8xl"
		>
			CARLOS <br /> GOMEZ
		</h1>
		<h2
			style="opacity: {animatedNameOpacity.current}; transform: translateY({animatedNamePosition.current}px)"
			class="pointer-events-none absolute text-left font-oswald text-lg leading-5"
		>
			{m.headline_developer()} <br />
			<span class="text-6xl font-medium">{m.headline_portfolio()}</span>
		</h2>

		{#if scrollIconVisible()}
			<div bind:this={scrollIconRef} transition:fade class="absolute bottom-0 opacity-60">
				<ChevronsDownIcon class="m-10 size-10" />
			</div>
		{/if}
	</div>
</section>
