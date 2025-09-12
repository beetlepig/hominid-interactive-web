<script>
	import { createSignal, mapNumRange } from '$lib';
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';
	import { resize, scroll } from 'motion';
	import { Spring } from 'svelte/motion';

	/** @type {{ headlineContainerRef: HTMLElement | null }} */
	const { headlineContainerRef } = $props();

	// prettier-ignore
	const verticesOfPyramid = [
		-1, 0, 0,
		0, 0, 1,
		1, 0, 0,
		0, 0, -1,
		0, 1, 0
	];
	// prettier-ignore
	const indicesOfFaces = [
		0, 2, 1,
		0, 3, 2,
		1, 4, 0,
		2, 4, 1,
		4, 2, 3,
		4, 3, 0
	];

	const animatedScale = new Spring(headlineContainerRef ? 1.4 : 1, {
		stiffness: 0.08,
		damping: 0.2
	});
	const animatedPosition = new Spring(headlineContainerRef ? -0.7 : -0.5, {
		stiffness: 0.08,
		damping: 0.2
	});

	const [scrollYProgress, setScrollYProgress] = createSignal(0);
	const [smBreakPoint, setSmBreakPoint] = createSignal(window.innerWidth <= 768);

	$effect(() => {
		/** @type {(progress: number) => void} */
		const scrollCallback = (progress) => {
			setScrollYProgress(progress);
		};
		scroll(scrollCallback, {
			container: document.getElementById('main-target') ?? undefined,
			target: headlineContainerRef ?? undefined
		});

		$effect(() => {
			const stop = resize(({ width }) => {
				setSmBreakPoint(width <= 768);
			});

			return () => {
				stop();
			};
		});
	});

	$effect(() => {
		if (headlineContainerRef) {
			const multiplier = smBreakPoint() ? 0.6 : 1;
			const initialScale = 1.5 * multiplier;
			const finalScale = 0.6 * multiplier;
			const initialPosition = -0.75;
			const finalPosition = -1.15;
			const scale = mapNumRange(scrollYProgress(), 0, 0.9, initialScale, finalScale);
			const position = mapNumRange(scrollYProgress(), 0, 0.9, initialPosition, finalPosition);

			animatedScale.target = scale;
			animatedPosition.target = position;
		}
	});
</script>

<SheetObject key="Pyramid">
	{#snippet children({ Transform })}
		<Transform>
			<T.Mesh position.y={animatedPosition.current} scale={animatedScale.current}>
				<T.PolyhedronGeometry args={[verticesOfPyramid, indicesOfFaces, 1, 0]} />
				<T.MeshStandardMaterial />
			</T.Mesh>
		</Transform>
	{/snippet}
</SheetObject>
