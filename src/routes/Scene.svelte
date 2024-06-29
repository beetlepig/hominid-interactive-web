<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from './Pyramid.svelte';
	import { SheetObject } from '@threlte/theatre';
	import PolyhedronSequence from './PolyhedronSequence.svelte';
	import { polyhedronSequence } from '$lib';
	import { useScrollStore } from './use-scroll-store.js';

	interactivity();

	const [scrollPosition] = useScrollStore();

	/**
	 * @type {symbol}
	 */
	let currentObjectSequence = $state(polyhedronSequence.Idle);

	$effect(() => {
		if (
			scrollPosition() > 20 &&
			scrollPosition() < 30 &&
			currentObjectSequence !== polyhedronSequence.Exit
		) {
			currentObjectSequence = polyhedronSequence.Exit;
		}
		console.log(scrollPosition());
	});
</script>

<PolyhedronSequence bind:currentObjectSequence />

<SheetObject key="Light" let:Transform>
	<Transform>
		<T.PointLight args={[0xffffff, 80, 100]} castShadow />
	</Transform>
</SheetObject>

<SheetObject key="Light Two" let:Transform>
	<Transform>
		<T.PointLight args={[0xffffff, 80, 100]} castShadow />
	</Transform>
</SheetObject>

<Pyramid />

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
