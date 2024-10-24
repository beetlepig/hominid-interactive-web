<script>
	/** @import { AnimationSectionEnumType } from './PolyhedronSequence.svelte' */
	/** @import { ScrollYProgressEventType } from '$lib' */

	import { T, useThrelte } from '@threlte/core';
	import Octahedron from '../../atoms/octahedron/Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from '../../atoms/pyramid/Pyramid.svelte';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';
	import PolyhedronSequence from './PolyhedronSequence.svelte';
	import { Vector2 } from 'three';
	import projectState from './main.theatre-project-state.json';

	/** @type {{ targetAnimationSection: AnimationSectionEnumType, onscrollprogress: ScrollYProgressEventType  }} */
	let { targetAnimationSection, onscrollprogress = $bindable() } = $props();

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
</script>

<Studio enabled={false} />

<Project name="main" config={{ state: projectState }}>
	<Sheet>
		<PolyhedronSequence {targetAnimationSection} />

		<T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={30} />

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

		<Pyramid bind:onscrollprogress />
		<Octahedron />
	</Sheet>
</Project>
