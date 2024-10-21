<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action';
	import { scrollAction } from '$lib/scroll-action.svelte.js';
	import { spring } from 'svelte/motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	let animatedOpacity = spring(0);

	/** @type {(event: CustomEvent<{scrollYProgress: number}>) => void} */
	const handleEmit = (event) => {
		console.log('emit', event.detail.scrollYProgress);
		animatedOpacity.update(() => event.detail.scrollYProgress, { soft: 1 });
	};
</script>

<div
	onemit={handleEmit}
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [0.4] }}
	use:scrollAction
	class={css({ height: '[250vh]', bgColor: 'amber.50/50' })}
>
	<div
		class={css({
			position: 'sticky',
			display: 'flex',
			top: '0',
			flexDir: 'column',
			justifyContent: 'flex-end',
			pb: '[10vh]',
			height: '[100vh]'
		})}
	>
		<p style="opacity: {$animatedOpacity}" class={css({ textAlign: 'center' })}>
			Hominid Interactive
		</p>
	</div>
</div>
