<script>
	import { T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { useCursor } from '@threlte/extras';
	import { useScrollStore } from './use-scroll-store';

	const scale = spring(1);
	const rotation = spring(0);

	const { onPointerEnter, onPointerLeave } = useCursor();
	const [scrollPercentage] = useScrollStore();

	$effect(() => {
		rotation.set(scrollPercentage() / 10);
	});

	// prettier-ignore
	const verticesOfOctahedron = [
		1, 0, 0, 	-1, 0, 0,	0, 1, 0,
		0, -1, 0, 	0, 0, 1,	0, 0, -1
	];
	// prettier-ignore
	const indicesOfFaces = [
		0, 2, 4,	0, 4, 3,	0, 3, 5,
		0, 5, 2,	1, 2, 5,	1, 5, 3,
		1, 3, 4,	1, 4, 2
	];
</script>

<T.Mesh
	position.x={0}
	rotation.y={$rotation}
	scale={$scale}
	on:pointerenter={() => {
		scale.set(1.5);
		onPointerEnter();
	}}
	on:pointerleave={() => {
		scale.set(1);
		onPointerLeave();
	}}
	castShadow
>
	<T.PolyhedronGeometry args={[verticesOfOctahedron, indicesOfFaces, 1, 0]} />
	<T.MeshNormalMaterial />
</T.Mesh>
