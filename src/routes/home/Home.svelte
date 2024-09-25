<script>
	/** @import { UIEventHandler } from 'svelte/elements' */

	import { css } from 'styled-system/css';
	import PolyhedronScene from './components/organisms/polyhedronScene/PolyhedronScene.svelte';
	import { useScrollStore } from './utils/hooks/use-scroll-store.js';
	import { Canvas } from '@threlte/core';
	import Introduction from './components/molecules/introduction/Introduction.svelte';
	import Headline from './components/molecules/headline/Headline.svelte';
	import Features from './components/molecules/features/Features.svelte';
	import Projects from './components/molecules/projects/Projects.svelte';
	import Chat from './components/molecules/chat/Chat.svelte';

	const setScrollPercentage = useScrollStore()[1];

	/**
	 * @type {UIEventHandler<HTMLDivElement>}
	 */
	const handleScroll = (event) => {
		const scrollTop = event.currentTarget.scrollTop;
		const scrollHeight = event.currentTarget.scrollHeight;
		const clientHeight = event.currentTarget.clientHeight;

		const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
		const percentageRounded = Math.round(percentage * 10) / 10;
		const percentageNormalized =
			Math.round(Math.max(0, Math.min(percentageRounded, 100)) * 10) / 10;

		setScrollPercentage(percentageNormalized);
	};
</script>

<div
	onscroll={handleScroll}
	id={'main-target'}
	class={css({ position: 'relative', h: '[100lvh]', w: 'full' })}
>
	<div
		class={css({
			pos: 'absolute',
			inset: '0'
		})}
	>
		<Canvas>
			<PolyhedronScene />
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
		<Headline />
		<Introduction />
		<Features />
		<Projects />
		<Chat />
	</div>
</div>
