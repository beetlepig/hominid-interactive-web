<script>
	import { cn } from '$lib/utils.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	/** @type {DropdownMenuPrimitive.SeparatorProps} */
	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<DropdownMenuPrimitive.Separator
	bind:ref
	data-slot="dropdown-menu-separator"
	class={cn('bg-border -mx-1 my-1 h-px', className)}
	{...restProps}
/>
