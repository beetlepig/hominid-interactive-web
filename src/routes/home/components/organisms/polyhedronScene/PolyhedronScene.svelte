<script>
	/** @import { AnimationSectionEnumType } from './PolyhedronSequence.svelte' */

	import { T, useThrelte } from '@threlte/core';
	import Octahedron from '../../atoms/octahedron/Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from '../../atoms/pyramid/Pyramid.svelte';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';
	import PolyhedronSequence, { AnimationSectionEnum } from './PolyhedronSequence.svelte';
	import { useScrollStore } from '../../../utils/hooks/use-scroll-store.js';
	import { Vector2 } from 'three';
	import { dev } from '$app/environment';
	import projectState from './main.theatre-project-state.json';
	import { createSignal } from '$lib';

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

	const [targetAnimationSection, setTargetAnimationSection] =
		/** @type {typeof createSignal<AnimationSectionEnumType>} */ (createSignal)(
			AnimationSectionEnum.Pyramid
		);

	$effect(() => {
		switch (true) {
			case scrollPosition() >= 0 && scrollPosition() <= 20: {
				setTargetAnimationSection(AnimationSectionEnum.Pyramid);
				break;
			}
			case scrollPosition() > 20 && scrollPosition() < 30: {
				setTargetAnimationSection(AnimationSectionEnum.Octahedron);
				break;
			}
		}
	});
</script>

<Studio enabled={dev} />

<Project name="main" config={{ state: projectState }}>
	<Sheet>
		<PolyhedronSequence targetAnimationSection={targetAnimationSection()} />

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
		<Octahedron />

		<T.PerspectiveCamera makeDefault position={[0, 0, 8]} fov={30} />
	</Sheet>
</Project>
