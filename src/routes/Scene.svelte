<script>
	import { T } from '@threlte/core';
	import { interactivity, useCursor } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { useScrollStore } from './use-scroll-store.js';

	const scale = spring(1);
	const rotation = spring(0);

	interactivity();
	const { onPointerEnter, onPointerLeave } = useCursor();
	const [scrollPercentage] = useScrollStore();

	$effect(() => {
		rotation.set(scrollPercentage() / 10);
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>
<T.DirectionalLight position={[0, 10, 10]} castShadow />
<T.Mesh
	rotation.y={$rotation}
	position.y={1}
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
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[4, 40]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>
