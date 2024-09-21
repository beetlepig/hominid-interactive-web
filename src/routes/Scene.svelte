<script>
	import { T, useThrelte } from '@threlte/core';
	import Octahedron from './Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from './Pyramid.svelte';
	import { SheetObject } from '@threlte/theatre';
	import PolyhedronSequence, { AnimationSectionEnum } from './PolyhedronSequence.svelte';
	import { useScrollStore } from './use-scroll-store.js';
	import { Vector2 } from 'three';

	const { camera } = useThrelte();

	/**
	 * @type {HTMLElement | undefined}
	 */
	const target = document.getElementById('main-target') ?? undefined;

	interactivity({
		target: target,
		compute: (event, state) => {
			state.pointer.update(
				() =>
					new Vector2(
						(event.clientX / (target?.clientWidth ?? window.innerWidth)) * 2 - 1,
						-(event.clientY / (target?.clientHeight ?? window.innerHeight)) * 2 + 1
					)
			);

			state.raycaster.setFromCamera(state.pointer.current, camera.current);
		}
	});

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

<SheetObject key="Light">
	{#snippet children({ Transform })}
		<Transform>
			<T.PointLight args={[0xffffff, 80, 100]} castShadow />
		</Transform>
	{/snippet}
</SheetObject>

<SheetObject key="Light Two">
	{#snippet children({ Transform })}
		<Transform>
			<T.PointLight args={[0xffffff, 80, 100]} castShadow />
		</Transform>
	{/snippet}
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
></T.PerspectiveCamera>
