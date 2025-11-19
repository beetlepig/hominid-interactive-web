<script>
	/** @import {WithElementRef} from "$lib/utils" */
	/** @import {HTMLAttributes} from "svelte/elements" */
	import { cn } from '$lib/utils';

	/** @type {WithElementRef<HTMLAttributes<HTMLDivElement>>} */
	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn('flex flex-col gap-2 text-center sm:text-left', className)}
	{...restProps}
>
	{@render children?.()}
</div>
