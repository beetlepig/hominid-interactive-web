<script>
	import { css } from 'styled-system/css';

	const textBoxStyle = css({ pointerEvents: 'auto', display: 'contents', spaceY: '4' });
	const textStyle = css({ bg: 'blue.400/30', fontSize: '3xl', color: 'red.400' });
</script>

<div class={textBoxStyle}>
	{#each Array.from({ length: 100 }, (_, i) => i) as item}
		<p class={textStyle}>pageee {item}</p>
	{/each}
</div>
