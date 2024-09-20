<script>
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';
	import { createSignal } from '$lib';

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

	const [scaleAnim, setScaleAnim] = createSignal(1);
</script>

<SheetObject key="Octahedron" let:Transform let:Sync>
	<Transform>
		<T.Mesh
			receiveShadow
			castShadow
			scale={scaleAnim()}
			on:pointerenter={() => {
				setScaleAnim(1.2);
			}}
			on:pointerleave={() => {
				setScaleAnim(1);
			}}
		>
			<T.PolyhedronGeometry args={[verticesOfOctahedron, indicesOfFaces, 1, 0]} />
			<T.MeshStandardMaterial>
				<Sync color emissive />
			</T.MeshStandardMaterial>
		</T.Mesh>
	</Transform>
</SheetObject>
