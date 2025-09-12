<script>
	/** @import { Vector3Tuple } from 'three/webgpu' */
	/** @import { IntersectionEvent } from '@threlte/extras' */
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
	import { Spring } from 'svelte/motion';

	interactivity();

	/**
	 * @typedef {object} PolyhedronSceneProps
	 * @property {AnimationSectionEnumType} targetAnimationSection
	 * @property {HTMLElement | null} [headlineContainerRef]
	 * @property {"Headline" | "Features" | "ReliableFrontend" | "AmazingTechnologies" | "FlexibleDevelopment"} projectName
	 * @property {number} [lightColor]
	 */

	/** @type {PolyhedronSceneProps} */
	const {
		targetAnimationSection,
		headlineContainerRef = null,
		projectName,
		lightColor = 0xffffff
	} = $props();

	/** @type {Spring<Vector3Tuple>} */
	const cursorPosition = new Spring([0, 0, 0]);

	const handlePointer = (/** @type {IntersectionEvent<PointerEvent>} */ event) => {
		cursorPosition.target = event.point.toArray();
	};
</script>

{#if dev && !building}
	<Studio enabled={true} />
{/if}

<Project name="Hominid" config={{ state: projectState }}>
	<Sheet name={projectName}>
		<PolyhedronSequence {targetAnimationSection} />

		<T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={30} />

		<T.Mesh
			scale={10}
			position.z={0}
			visible={false}
			onpointermove={handlePointer}
			onclick={handlePointer}
		>
			<T.PlaneGeometry />
		</T.Mesh>

		<SheetObject key="Light">
			{#snippet children({ Transform })}
				<Transform>
					<T.PointLight args={[0xffffff, 50, 10]} />
				</Transform>
			{/snippet}
		</SheetObject>

		<SheetObject key="Light Two">
			{#snippet children({ Transform })}
				<Transform>
					<T.PointLight args={[0xffffff, 50, 10]} />
				</Transform>
			{/snippet}
		</SheetObject>

		<T.PointLight
			args={[lightColor, 20, 10]}
			position.x={cursorPosition.current[0]}
			position.y={cursorPosition.current[1]}
			position.z={2}
		/>

		{#if projectName === 'Headline'}
			<Pyramid {headlineContainerRef} />
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
