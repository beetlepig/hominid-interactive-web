<script>
	/** @import { ScrollYProgressEventType } from '$lib' */

	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { mapNumRange, scrollAction } from '$lib';
	import { tweened } from 'svelte/motion';

	/** @type {{ onVisible: () => void, onscrollprogress: ScrollYProgressEventType }} */
	let { onVisible, onscrollprogress } = $props();

	const animatedOpacity = tweened(0.9, { delay: 20, duration: 200 });
	const animatedPosition = tweened(0, { delay: 20, duration: 200 });
	const animatedNameOpacity = tweened(0, { delay: 20, duration: 200 });
	const animatedNamePosition = tweened(0, { delay: 20, duration: 200 });

	/** @type {ScrollYProgressEventType} */
	const handleScrollProgress = (event) => {
		const opacity = mapNumRange(event.detail.scrollYProgress, 0, 0.2, 0.9, 0);
		const position = mapNumRange(event.detail.scrollYProgress, 0, 0.2, 0, -40);
		const nameOpacity = mapNumRange(event.detail.scrollYProgress, 0.2, 0.4, 0, 0.9);
		const namePosition = mapNumRange(event.detail.scrollYProgress, 0.1, 0.25, 0, -25);

		animatedOpacity.update(() => opacity);
		animatedPosition.update(() => position);
		animatedNameOpacity.update(() => nameOpacity);
		animatedNamePosition.update(() => namePosition);

		onscrollprogress(event);
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
			justifyContent: 'center',
			alignItems: 'center',
			pb: '[10vh]',
			height: '[100vh]',
			animationName: 'fadein',
			animationDuration: 'slowest',
			animationTimingFunction: 'in'
		})}
	>
		<p
			style="opacity: {$animatedOpacity}; transform: translateY({$animatedPosition}px)"
			class={css({
				position: 'absolute',
				textAlign: 'center',
				fontFamily: 'raleway',
				fontWeight: 'black',
				fontSize: '8xl',
				lineHeight: 'tight'
			})}
		>
			CARLOS <br /> GOMEZ
		</p>
		<p
			style="opacity: {$animatedNameOpacity}; transform: translateY({$animatedNamePosition}px)"
			class={css({
				position: 'absolute',
				textAlign: 'left',
				fontFamily: 'oswald',
				lineHeight: 'tight',
				fontSize: 'lg'
			})}
		>
			Developer's <br />
			<span class={css({ fontSize: '6xl', fontWeight: 'medium' })}>PORTFOLIO</span>
		</p>
	</div>
</div>
