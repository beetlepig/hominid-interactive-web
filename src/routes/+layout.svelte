<script>
	import '../app.css';

	import { css } from 'styled-system/css';
	import { dev } from '$app/environment';

	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { useScrollStore } from './use-scroll-store';
	import { Project, Sheet, Studio } from '@threlte/theatre';
	import state from './default.theatre-project-state.json';

	const setScrollPercentage = useScrollStore()[1];

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

		setScrollPercentage(percentageNormalized);
	};
</script>

<main class={css({ h: '[100lvh]' })}>
	<div
		onscroll={handleScroll}
		id={'main-target'}
		class={css({ position: 'relative', h: 'full', overflow: 'auto', w: 'full' })}
	>
		<div
			class={css({
				pos: 'fixed',
				left: '0',
				top: '0',
				h: 'full',
				w: 'full'
			})}
		>
			<Studio enabled={dev} />
			<Canvas>
				<Project config={{ state }}>
					<Sheet>
						<Scene />
					</Sheet>
				</Project>
			</Canvas>
		</div>

		<div
			class={css({
				w: 'full'
			})}
		>
			<slot />
		</div>
	</div>
</main>
