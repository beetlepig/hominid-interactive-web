<script>
	import { cn } from '$lib/utils.js';
	import { Dialog as DialogPrimitive } from 'bits-ui';

	/** @type {DialogPrimitive.TitleProps} */
	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={cn('text-lg leading-none font-semibold', className)}
	{...restProps}
/>
