<script>
	/** @import { AnimationSectionEnumType } from './PolyhedronSequence.svelte' */

	import { T } from '@threlte/core';
	import Octahedron from '../../atoms/octahedron/Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from '../../atoms/pyramid/Pyramid.svelte';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';
	import PolyhedronSequence from './PolyhedronSequence.svelte';
	import projectState from './main.theatre-project-state.json';

	/** @type {{ targetAnimationSection: AnimationSectionEnumType, headlineContainerRef: HTMLElement | null, projectName: string }} */
	const { targetAnimationSection, headlineContainerRef, projectName } = $props();

	interactivity();
</script>

<Studio enabled={false} />

<Project name={projectName} config={{ state: projectState }}>
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

		<Pyramid {headlineContainerRef} />
		<Octahedron />
	</Sheet>
</Project>
