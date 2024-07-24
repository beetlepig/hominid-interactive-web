<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from './Pyramid.svelte';
	import { SheetObject } from '@threlte/theatre';
	import PolyhedronSequence, { AnimationSectionEnum } from './PolyhedronSequence.svelte';
	import { useScrollStore } from './use-scroll-store.js';

	interactivity();

	const [scrollPosition] = useScrollStore();

	/**
	 * @type {import('./PolyhedronSequence.svelte').AnimationSectionEnumType}
	 */
	let targetAnimationSection = $state(AnimationSectionEnum.Pyramid);

	$effect(() => {
		switch (true) {
			case scrollPosition() >= 0 && scrollPosition() <= 20: {
				targetAnimationSection = AnimationSectionEnum.Pyramid;
				break;
			}
			case scrollPosition() > 20 && scrollPosition() < 30: {
				targetAnimationSection = AnimationSectionEnum.Octahedron;
				break;
			}
		}
	});
</script>

<PolyhedronSequence {targetAnimationSection} />

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
