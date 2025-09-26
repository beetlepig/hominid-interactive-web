<script>
	import { LinkPreview as HoverCardPrimitive } from 'bits-ui';

	/** @type {HoverCardPrimitive.TriggerProps} */
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<HoverCardPrimitive.Trigger bind:ref data-slot="hover-card-trigger" {...restProps} />
