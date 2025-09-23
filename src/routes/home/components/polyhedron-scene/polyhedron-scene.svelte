<script>
	/** @import {Vector3Tuple} from 'three/webgpu' */
	/** @import {IntersectionEvent} from '@threlte/extras' */
	/** @import {AnimationSectionEnumType} from './polyhedron-scene-sequence.svelte' */
	import { dev, building } from '$app/environment';
	import Dodecahedron from '../ui/atoms/dodecahedron/Dodecahedron.svelte';
	import Icosahedron from '../ui/atoms/icosahedron/Icosahedron.svelte';
	import Octahedron from '../ui/atoms/octahedron/Octahedron.svelte';
	import Pyramid from '../ui/atoms/pyramid/Pyramid.svelte';
	import projectState from './Hominid.theatre-project-state.json';
	import PolyhedronSceneSequence from './polyhedron-scene-sequence.svelte';
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Project, Sheet, SheetObject, Studio } from '@threlte/theatre';
	import { Spring } from 'svelte/motion';

	interactivity();

	/**
	 * @typedef {object} PolyhedronSceneProps
	 * @property {AnimationSectionEnumType} targetAnimationSection - The animation section to drive
	 *   the sequence state.
	 * @property {'Headline'
	 * 	| 'Features'
	 * 	| 'ReliableFrontend'
	 * 	| 'AmazingTechnologies'
	 * 	| 'FlexibleDevelopment'} projectName
	 *   - Which scene configuration to render.
	 *
	 * @property {number} [lightColor] - Hex color for the interactive point light.
	 */

	/** @type {PolyhedronSceneProps} */
	const { targetAnimationSection, projectName, lightColor = 0xffffff } = $props();

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
		<PolyhedronSceneSequence {targetAnimationSection} />

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
			<Pyramid />
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
