<script>
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';

	const t = (1 + Math.sqrt(5)) / 2;

	// prettier-ignore
	const verticesOfIcosahedron = [
		- 1, t, 0, 	1, t, 0, 	- 1, - t, 0, 	1, - t, 0,
		0, - 1, t, 	0, 1, t,	0, - 1, - t, 	0, 1, - t,
		t, 0, - 1, 	t, 0, 1, 	- t, 0, - 1, 	- t, 0, 1
	];
	// prettier-ignore
	const indicesOfFaces = [
		0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
		1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
		3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
		4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
	];
</script>

<SheetObject key="Icosahedron">
	{#snippet children({ Transform, Sync })}
		<Transform>
			<T.Mesh receiveShadow castShadow>
				<T.PolyhedronGeometry args={[verticesOfIcosahedron, indicesOfFaces, 1, 0]} />
				<T.MeshStandardMaterial>
					<Sync color emissive />
				</T.MeshStandardMaterial>
			</T.Mesh>
		</Transform>
	{/snippet}
</SheetObject>
