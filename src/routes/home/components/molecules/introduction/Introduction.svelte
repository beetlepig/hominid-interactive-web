<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

<div
	class={css({ padding: '32' })}
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [1] }}
>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae scelerisque erat.
		Phasellus ex metus, volutpat et varius eget, pellentesque quis quam. Suspendisse sed blandit
		arcu. Nullam nec elit fringilla, sollicitudin massa eu, auctor lorem. Morbi vitae imperdiet leo.
		Duis mollis metus imperdiet dui placerat, non consequat risus malesuada. Cras commodo sapien
		vitae ultricies interdum. Phasellus accumsan lacus vitae odio elementum mattis eu a orci.
	</p>
</div>
