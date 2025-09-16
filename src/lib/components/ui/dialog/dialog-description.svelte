<script>
	import { cn } from '$lib/utils.js';
	import { Dialog as DialogPrimitive } from 'bits-ui';

	/** @type {DialogPrimitive.DescriptionProps} */
	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="dialog-description"
	class={cn('text-sm text-muted-foreground', className)}
	{...restProps}
/>
