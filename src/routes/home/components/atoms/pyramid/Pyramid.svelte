<script>
	/** @import { ScrollYProgressEventType } from '$lib' */

	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';
	import { tweened } from 'svelte/motion';
	import { mapNumRange } from '$lib';

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

	/** @type {{ onscrollprogress: ScrollYProgressEventType  }} */
	let { onscrollprogress = $bindable() } = $props();

	const animatedScale = tweened(1.4, { delay: 20, duration: 200 });
	const animatedPosition = tweened(-0.7, { delay: 20, duration: 200 });

	/** @type {{ onscrollprogress: ScrollYProgressEventType  }} */
	onscrollprogress = (event) => {
		const scale = mapNumRange(event.detail.scrollYProgress, 0.1, 0.2, 1.4, 1);
		const position = mapNumRange(event.detail.scrollYProgress, 0.1, 0.2, -0.7, -0.5);

		animatedScale.update(() => scale);
		animatedPosition.update(() => position);
	};
</script>

<SheetObject key="Pyramid">
	{#snippet children({ Transform, Sync })}
		<Transform>
			<T.Mesh castShadow receiveShadow position.y={$animatedPosition} scale={$animatedScale}>
				<T.PolyhedronGeometry args={[verticesOfPyramid, indicesOfFaces, 1, 0]} />
				<T.MeshStandardMaterial>
					<Sync color emissive />
				</T.MeshStandardMaterial>
			</T.Mesh>
		</Transform>
	{/snippet}
</SheetObject>
