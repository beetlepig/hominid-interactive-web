<script>
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	/** @type {DropdownMenuPrimitive.TriggerProps} */
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<DropdownMenuPrimitive.Trigger bind:ref data-slot="dropdown-menu-trigger" {...restProps} />
