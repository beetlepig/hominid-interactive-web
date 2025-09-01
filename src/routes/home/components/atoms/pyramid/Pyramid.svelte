<script>
	import { createSignal, mapNumRange } from '$lib';
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';
	import { scroll } from 'motion';
	import { Tween } from 'svelte/motion';

	/** @type {{ headlineContainerRef: HTMLElement | null, smBreakPoint: boolean }} */
	const { headlineContainerRef, smBreakPoint } = $props();

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

	const animatedScale = new Tween(headlineContainerRef ? 1.4 : 1, { delay: 20, duration: 200 });
	const animatedPosition = new Tween(headlineContainerRef ? -0.7 : -0.5, {
		delay: 20,
		duration: 200
	});

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
		if (headlineContainerRef) {
			const multiplier = smBreakPoint ? 0.8 : 1;
			const scale = mapNumRange(scrollYProgress(), 0, 0.2, 1.4 * multiplier, 1 * multiplier);
			const position = mapNumRange(scrollYProgress(), 0, 0.2, -0.7, -0.5);

			animatedScale.target = scale;
			animatedPosition.target = position;
		}
	});
</script>

<SheetObject key="Pyramid">
	{#snippet children({ Transform, Sync })}
		<Transform>
			<T.Mesh
				castShadow
				receiveShadow
				position.y={animatedPosition.current}
				scale={animatedScale.current}
			>
				<T.PolyhedronGeometry args={[verticesOfPyramid, indicesOfFaces, 1, 0]} />
				<T.MeshStandardMaterial>
					<Sync color emissive />
				</T.MeshStandardMaterial>
			</T.Mesh>
		</Transform>
	{/snippet}
</SheetObject>
