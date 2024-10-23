<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { mapNumRange, scrollAction } from '$lib';
	import { tweened } from 'svelte/motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	const animatedOpacity = tweened(1, { delay: 20, duration: 200 });
	const animatedPosition = tweened(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = tweened(0, { delay: 20, duration: 200 });
	const animatedNamePosition = tweened(0, { delay: 20, duration: 200 });

	/** @type {(event: CustomEvent<{scrollYProgress: number}>) => void} */
	const handleScrollProgress = (event) => {
		const opacity = mapNumRange(event.detail.scrollYProgress, 0, 0.2, 1, 0);
		const position = mapNumRange(event.detail.scrollYProgress, 0, 0.2, 0, -40);
		const nameOpacity = mapNumRange(event.detail.scrollYProgress, 0.2, 0.5, 0, 1);
		const namePosition = mapNumRange(event.detail.scrollYProgress, 0.1, 0.25, 0, -25);

		animatedOpacity.update(() => opacity);
		animatedPosition.update(() => position);
		animatedNameOpacity.update(() => nameOpacity);
		animatedNamePosition.update(() => namePosition);
	};
</script>

<div
	onscrollprogress={handleScrollProgress}
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [0.4] }}
	use:scrollAction
	class={css({ height: '[250vh]' })}
>
	<div
		class={css({
			position: 'sticky',
			display: 'flex',
			top: '0',
			flexDir: 'column',
			justifyContent: 'flex-end',
			pb: '[10vh]',
			height: '[100vh]',
			animationName: 'fadein',
			animationDuration: 'slowest',
			animationTimingFunction: 'in'
		})}
	>
		<p
			style="opacity: {$animatedOpacity}; transform: translateY({$animatedPosition}px)"
			class={css({ textAlign: 'center' })}
		>
			Hominid Interactive
		</p>
		<p
			style="opacity: {$animatedNameOpacity}; transform: translateY({$animatedNamePosition}px)"
			class={css({ textAlign: 'center' })}
		>
			Carlos Gomez
		</p>
	</div>
</div>
