<script>
	import { Dialog as DialogPrimitive } from 'bits-ui';

	/** @type {DialogPrimitive.CloseProps} */
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {...restProps} />
