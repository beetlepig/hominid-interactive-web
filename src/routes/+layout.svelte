<script>
	import '../app.css';

	import { css } from 'styled-system/css';

	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { scrollStore } from './scroll.svelte';

	/**
	 * @type {import('svelte/elements').UIEventHandler<HTMLDivElement>}
	 */
	const handleScroll = (event) => {
		const scrollTop = event.currentTarget.scrollTop;
		const scrollHeight = event.currentTarget.scrollHeight;
		const clientHeight = event.currentTarget.clientHeight;

		const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
		const percentageRounded = Math.round(percentage * 10) / 10;
		const percentageNormalized =
			Math.round(Math.max(0, Math.min(percentageRounded, 100)) * 10) / 10;

		scrollStore.scrollPercentage = percentageNormalized;
	};
</script>

<main class={css({ h: '[100lvh]' })}>
	<div
		onscroll={handleScroll}
		class={css({ position: 'relative', h: 'full', overflow: 'auto', w: 'full' })}
	>
		<p>{scrollStore.scrollPercentage}</p>
		<div
			class={css({
				pos: 'fixed',
				left: '0',
				top: '0',
				h: 'full',
				w: 'full'
			})}
		>
			<Canvas colorSpace="display-p3" useLegacyLights={false}>
				<Scene />
			</Canvas>
		</div>

		<div
			class={css({
				w: 'full',
				position: 'relative',
				pointerEvents: 'none'
			})}
		>
			<slot />
		</div>
	</div>
</main>
