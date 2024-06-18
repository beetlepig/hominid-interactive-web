<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from './Pyramid.svelte';

	interactivity();
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 8]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
	fov={30}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>
<T.DirectionalLight position={[0, 10, 10]} castShadow />
<Pyramid />
<Octahedron />
