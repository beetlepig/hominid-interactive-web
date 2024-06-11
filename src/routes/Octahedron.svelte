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
		1, 0, 0,   // Vertex 0 (right)
		0, 1, 0,   // Vertex 1 (top)
		-1, 0, 0,  // Vertex 2 (left)
		0, -1, 0,  // Vertex 3 (bottom)
		0, 0, 1,   // Vertex 4 (front)
		0, 0, -1   // Vertex 5 (back)
	];
	// prettier-ignore
	const indicesOfFaces = [
		0, 1, 4,  // Top front triangle
		1, 2, 4,  // Top left triangle
		2, 3, 4,  // Top back triangle
		3, 0, 4,  // Top right triangle
		1, 0, 5,  // Bottom front triangle
		2, 1, 5,  // Bottom left triangle
		3, 2, 5,  // Bottom back triangle
		0, 3, 5   // Bottom right triangle
	];
</script>

<T.Mesh
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
	<T.PolyhedronGeometry args={[verticesOfOctahedron, indicesOfFaces, 1, 0]}></T.PolyhedronGeometry>
	<T.MeshNormalMaterial />
</T.Mesh>
