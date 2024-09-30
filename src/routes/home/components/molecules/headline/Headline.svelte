<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

<div
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [0.4] }}
	class={css({ height: '[250vh]', bgColor: 'amber.50/50' })}
>
	<div
		class={css({
			position: 'sticky',
			display: 'flex',
			top: '0',
			flexDir: 'column',
			justifyContent: 'center',
			height: '[100vh]'
		})}
	>
		<p class={css({ textAlign: 'center' })}>Hominid Interactive</p>
	</div>
</div>
