<script>
	import { css } from 'styled-system/css';
	import { useScrollStore } from './use-scroll-store';

	const [scrollPercentage] = useScrollStore();
</script>

<div class={css({ display: 'contents', spaceY: '4' })}>
	{#each Array.from({ length: 100 }, (_, i) => i) as item}
		<p
			class={css({
				bg: 'blue.400/30',
				fontSize: '3xl',
				color: 'red.400',
				pointerEvents: 'auto'
			})}
		>
			pageee {item}
			{scrollPercentage()}
		</p>
	{/each}
</div>
