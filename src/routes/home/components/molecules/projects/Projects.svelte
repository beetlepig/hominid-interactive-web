<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { sections } from '$lib/constans/index.js';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

<div
	id={sections.projects.id}
	class={css({ height: '[100vh]', bgColor: 'green.200/50' })}
	use:interceptionObserverAction={{
		onIntercepted: onVisible,
		threshold: [0.9]
	}}
>
	<p>carrousel</p>
</div>
