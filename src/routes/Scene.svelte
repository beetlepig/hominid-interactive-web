<script lang="ts">
	import { T } from '@threlte/core';
	import Tetrahedron from './Tetrahedron.svelte';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';

	interactivity();
</script>

<T.PerspectiveCamera
	makeDefault
	position={[20, 0.5, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
	fov={'20'}
/>
<T.DirectionalLight position={[0, 10, 10]} castShadow />
<Tetrahedron />
<Octahedron />
