<script>
	/** @import {HTMLAttributes} from "svelte/elements" */
	/** @import {WithElementRef} from "$lib/utils" */
	import { cn } from '$lib/utils';

	/** @type {WithElementRef<HTMLAttributes<HTMLDivElement>>} */
	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-footer"
	class={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
	{...restProps}
>
	{@render children?.()}
</div>
