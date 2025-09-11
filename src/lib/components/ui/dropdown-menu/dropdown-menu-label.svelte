<script>
	/** @import { WithElementRef } from '$lib/utils.js' */
	/** @import { HTMLAttributes } from 'svelte/elements' */
	import { cn } from '$lib/utils.js';

	/** @type {WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    inset?: boolean;
  }} */
	let { ref = $bindable(null), class: className, inset, children, ...restProps } = $props();
</script>

<div
	bind:this={ref}
	data-slot="dropdown-menu-label"
	data-inset={inset}
	class={cn('px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8', className)}
	{...restProps}
>
	{@render children?.()}
</div>
