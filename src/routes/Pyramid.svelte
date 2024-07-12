<script>
	import { T } from '@threlte/core';
	import { SheetObject } from '@threlte/theatre';

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
</script>

<SheetObject key="Pyramid" let:Transform let:Sync>
	<Transform>
		<T.Mesh castShadow receiveShadow position.y={-0.5}>
			<T.PolyhedronGeometry args={[verticesOfPyramid, indicesOfFaces, 1, 0]} />
			<T.MeshStandardMaterial>
				<Sync color emissive />
			</T.MeshStandardMaterial>
		</T.Mesh>
	</Transform>
</SheetObject>
