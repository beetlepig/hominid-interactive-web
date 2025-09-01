<script>
	/** @import { AnimationSectionEnumType } from './PolyhedronSequence.svelte' */
	import { dev, building } from '$app/environment';
	import Dodecahedron from '../../atoms/dodecahedron/Dodecahedron.svelte';
	import Icosahedron from '../../atoms/icosahedron/Icosahedron.svelte';
	import Octahedron from '../../atoms/octahedron/Octahedron.svelte';
	import Pyramid from '../../atoms/pyramid/Pyramid.svelte';
	import projectState from './Hominid.theatre-project-state.json';
	import PolyhedronSequence from './PolyhedronSequence.svelte';
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';

	/**
	 * @typedef {object} PolyhedronSceneProps
	 * @property {AnimationSectionEnumType} targetAnimationSection
	 * @property {HTMLElement | null} headlineContainerRef
	 * @property {"Headline" | "Features" | "ReliableFrontend" | "AmazingTechnologies" | "FlexibleDevelopment"} projectName
	 * @property {boolean} [smBreakPoint]
	 */

	/** @type {PolyhedronSceneProps} */
	const {
		targetAnimationSection,
		headlineContainerRef,
		projectName,
		smBreakPoint = false
	} = $props();

	interactivity();
</script>

{#if dev && !building}
	<Studio enabled={true} />
{/if}

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
			<Pyramid {headlineContainerRef} {smBreakPoint} />
		{:else if projectName === 'Features'}
			<Octahedron />
			<Dodecahedron />
			<Icosahedron />
		{:else if projectName === 'ReliableFrontend'}
			<Octahedron />
		{:else if projectName === 'AmazingTechnologies'}
			<Dodecahedron />
		{:else if projectName === 'FlexibleDevelopment'}
			<Icosahedron />
		{/if}
	</Sheet>
</Project>
