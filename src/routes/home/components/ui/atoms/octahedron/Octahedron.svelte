<script>
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';

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

<SheetObject key="Octahedron">
	{#snippet children({ Transform })}
		<Transform>
			<T.Mesh>
				<T.PolyhedronGeometry args={[verticesOfOctahedron, indicesOfFaces, 1, 0]} />
				<T.MeshStandardNodeMaterial />
			</T.Mesh>
		</Transform>
	{/snippet}
</SheetObject>
