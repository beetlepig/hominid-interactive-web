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
	const verticesOfTetrahedron = [
		// Define the vertices of the tetrahedron
		-1, 0, -1,   // Vertex 0
		1, 0, -1,    // Vertex 1
		0, 0, 1,     // Vertex 2
		0, 1, 0      // Vertex 3
	];

	// prettier-ignore
	const indicesOfFaces = [
		// Define the indices that make up each face of the tetrahedron
		0, 1, 2,   // Base Face
		0, 3, 1,   // Side Face 0
		1, 3, 2,   // Side Face 1
		2, 3, 0    // Side Face 2
	];
</script>

<T.Mesh
	position.z={5}
	position.y={1}
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
	<T.PolyhedronGeometry args={[verticesOfTetrahedron, indicesOfFaces, 1, 0]} />
	<T.MeshNormalMaterial />
</T.Mesh>
