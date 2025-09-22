<script>
	import { buttonVariants } from '$components/ui/atoms/button/index.js';
	import * as DropdownMenu from '$components/ui/molecules/dropdown-menu/index.js';
	import { cn } from '$lib/utils';
	import GlobeIcon from '@lucide/svelte/icons/globe';

	/**
	 * @typedef {object} Language
	 * @property {string} code
	 * @property {string} label
	 */

	/**
	 * @typedef {object} LanguageSwitcherProps
	 * @property {Language[]} languages
	 * @property {string} [value]
	 * @property {'start' | 'center' | 'end'} [align]
	 * @property {'outline' | 'ghost'} [variant]
	 * @property {(code: string) => void} [onChange]
	 * @property {string} [class]
	 */

	/** @type {LanguageSwitcherProps} */
	let {
		languages = [],
		value = $bindable(''),
		align = 'end',
		variant = 'outline',
		onChange,
		class: className
	} = $props();

	// set default code if there isn't one selected
	if (value === '') {
		value = languages[0].code;
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(buttonVariants({ variant, size: 'icon' }), className)}
		aria-label="Change language"
	>
		<GlobeIcon class="size-4" />
		<span class="sr-only">Change language</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content {align}>
		<DropdownMenu.RadioGroup bind:value onValueChange={onChange}>
			{#each languages as language (language.code)}
				<DropdownMenu.RadioItem value={language.code}>
					{language.label}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
