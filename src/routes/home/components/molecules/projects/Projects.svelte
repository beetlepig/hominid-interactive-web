<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans';
	import { inView } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	$effect(() => {
		if (projectsContainerRef) {
			const stop = inView(
				projectsContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.9 }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<section
	id={sections.projects.id}
	class={css({
		height: '[100dvh]',
		display: 'flex',
		alignItems: 'center'
	})}
	bind:this={projectsContainerRef}
>
	<ul
		class={css({
			margin: '0',
			display: 'flex',
			flex: '1',
			overflowX: 'scroll',
			gap: '5',
			maxH: '2xl',
			h: 'full',
			paddingX: '[max(6.25vw,(100vw - 1680px)/2)]',
			scrollSnapType: '[x mandatory]',
			scrollbarWidth: '[none]',
			boxSizing: 'content-box'
		})}
	>
		<li
			class={css({
				margin: '0',
				padding: '0',
				scrollSnapAlign: 'center',
				flex: '[0 0 min(max(87.5vw,280px),1680px)]',
				bgColor: 'blue.400/50'
			})}
		>
			<div>1</div>
		</li>
		<li
			class={css({
				margin: '0',
				padding: '0',
				scrollSnapAlign: 'center',
				flex: '[0 0 min(max(87.5vw,280px),1680px)]',
				bgColor: 'blue.400/50'
			})}
		>
			<div>2</div>
		</li>
		<li
			class={css({
				margin: '0',
				padding: '0',
				scrollSnapAlign: 'center',
				flex: '[0 0 min(max(87.5vw,280px),1680px)]',
				bgColor: 'blue.400/50'
			})}
		>
			<div>3</div>
		</li>
	</ul>
</section>
