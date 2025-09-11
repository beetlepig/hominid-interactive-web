<script>
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	/** @type {DropdownMenuPrimitive.GroupProps} */
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<DropdownMenuPrimitive.Group bind:ref data-slot="dropdown-menu-group" {...restProps} />
