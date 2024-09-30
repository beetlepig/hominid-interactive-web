<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

<div
	class={css({ height: '[100vh]', bgColor: 'green.200/50' })}
	use:interceptionObserverAction={{
		onIntercepted: onVisible,
		threshold: [0.9]
	}}
>
	<p>carrousel</p>
</div>
