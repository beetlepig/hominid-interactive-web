<script>
	/** @import { AnimationSectionEnumType } from './PolyhedronSequence.svelte' */

	import { T } from '@threlte/core';
	import Octahedron from '../../atoms/octahedron/Octahedron.svelte';
	import { interactivity } from '@threlte/extras';
	import Pyramid from '../../atoms/pyramid/Pyramid.svelte';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';
	import PolyhedronSequence from './PolyhedronSequence.svelte';
	import projectState from './Hominid.theatre-project-state.json';
	import Icosahedron from '../../atoms/icosahedron/Icosahedron.svelte';

	/** @type {{ targetAnimationSection: AnimationSectionEnumType, headlineContainerRef: HTMLElement | null, projectName: string }} */
	const { targetAnimationSection, headlineContainerRef, projectName } = $props();

	interactivity();
</script>

<Studio enabled={true} />

<Project name="Hominid" config={{ state: projectState }}>
	<Sheet name={projectName}>
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

		{#if projectName === 'Headline'}
			<Pyramid {headlineContainerRef} />
		{:else if projectName === 'Features'}
			<Octahedron />
			<Icosahedron />
		{:else if projectName === 'ReliableFrontend'}
			<Octahedron />
		{:else if projectName === 'AmazingTechnologies'}
			<Icosahedron />
		{:else}
			<Octahedron />
		{/if}
	</Sheet>
</Project>
