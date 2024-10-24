<script>
	/** @import { AnimationSectionEnumType } from './components/organisms/polyhedron-scene/PolyhedronSequence.svelte' */

	import { css } from 'styled-system/css';
	import PolyhedronScene from './components/organisms/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from './components/organisms/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import Introduction from './components/molecules/introduction/Introduction.svelte';
	import Headline from './components/molecules/headline/Headline.svelte';
	import Features from './components/molecules/features/Features.svelte';
	import Projects from './components/molecules/projects/Projects.svelte';
	import Chat from './components/molecules/chat/Chat.svelte';
	import { createSignal } from '$lib';

	/** @type {HTMLElement} */
	let headlineContainerRef;

	const [targetAnimationSection, setTargetAnimationSection] =
		/** @type {typeof createSignal<AnimationSectionEnumType>} */ (createSignal)(
			AnimationSectionEnum.Pyramid
		);

	const setPyramidTarget = () => {
		setTargetAnimationSection(AnimationSectionEnum.Pyramid);
	};
	const setOctahedronTarget = () => {
		setTargetAnimationSection(AnimationSectionEnum.Octahedron);
	};
</script>

<div
	id={'main-target'}
	class={css({ position: 'relative', h: '[100lvh]', w: 'full', bgColor: 'gray.100' })}
>
	<div
		class={css({
			pos: 'absolute',
			inset: '0'
		})}
	>
		<Canvas>
			<PolyhedronScene {headlineContainerRef} targetAnimationSection={targetAnimationSection()} />
		</Canvas>
	</div>

	<div
		class={css({
			position: 'relative',
			w: 'full',
			h: 'full',
			overflow: 'auto'
		})}
	>
		<Headline bind:headlineContainerRef onVisible={setPyramidTarget} />
		<Introduction onVisible={setOctahedronTarget} />
		<Features onVisible={setOctahedronTarget} />
		<Projects onVisible={setOctahedronTarget} />
		<Chat onVisible={setOctahedronTarget} />
	</div>
</div>
