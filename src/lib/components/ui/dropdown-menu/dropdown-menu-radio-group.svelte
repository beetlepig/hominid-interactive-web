<script>
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	/** @type {DropdownMenuPrimitive.RadioGroupProps} */
	let { ref = $bindable(null), value = $bindable(), ...restProps } = $props();
</script>

<DropdownMenuPrimitive.RadioGroup
	bind:ref
	bind:value
	data-slot="dropdown-menu-radio-group"
	{...restProps}
/>
