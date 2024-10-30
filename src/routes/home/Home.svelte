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
	import { replaceState } from '$app/navigation';
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans/index.js';

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
		id="overflow-container"
		class={css({
			position: 'relative',
			w: 'full',
			h: 'full',
			overflow: 'auto'
		})}
	>
		<Headline
			bind:headlineContainerRef
			onVisible={() => {
				setPyramidTarget();
				replaceState(sections.home.href, { hash: sections.home.href });
			}}
		/>
		<Introduction
			onVisible={() => {
				setPyramidTarget();
				replaceState(sections.aboutMe.href, { hash: sections.aboutMe.href });
			}}
		/>
		<Features
			onVisible={() => {
				setOctahedronTarget();
				replaceState(sections.skills.href, { hash: sections.skills.href });
			}}
		/>
		<Projects
			onVisible={() => {
				setOctahedronTarget();
				replaceState(sections.projects.href, { hash: sections.projects.href });
			}}
		/>
		<Chat
			onVisible={() => {
				setOctahedronTarget();
				replaceState(sections.chat.href, { hash: sections.chat.href });
			}}
		/>
	</div>
</div>
