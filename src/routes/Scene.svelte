<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from './Pyramid.svelte';
	import { SheetObject } from '@threlte/theatre';
	import PolyhedronSequence, { PolyhedronSequenceEnum } from './PolyhedronSequence.svelte';
	import { useScrollStore } from './use-scroll-store.js';
	import { onMount } from 'svelte';

	interactivity();

	const [scrollPosition] = useScrollStore();

	/**
	 * @type {import('./PolyhedronSequence.svelte').PolyhedronSequenceEnumType}
	 */
	let targetObjectSequence = $state(PolyhedronSequenceEnum.EnterPyramid);

	onMount(() => {
		setTimeout(() => {
			targetObjectSequence = PolyhedronSequenceEnum.IdlePyramid;
		}, 500);
	});

	$effect(() => {
		switch (true) {
			case scrollPosition() > 20 && scrollPosition() < 30: {
				targetObjectSequence = PolyhedronSequenceEnum.ExitPyramid;
				break;
			}
		}
	});
</script>

<PolyhedronSequence bind:targetObjectSequence />

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
<Octahedron />

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
