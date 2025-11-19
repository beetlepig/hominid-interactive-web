<script>
	/** @import {WithElementRef} from "$lib/utils" */
	/** @import {HTMLAttributes} from "svelte/elements" */
	import { cn } from '$lib/utils';

	/** @type {WithElementRef<HTMLAttributes<HTMLSpanElement>>} */
	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
</script>

<span
	bind:this={ref}
	data-slot="dropdown-menu-shortcut"
	class={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
	{...restProps}
>
	{@render children?.()}
</span>
