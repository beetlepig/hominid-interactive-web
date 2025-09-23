<script>
	import { buttonVariants } from '$components/ui/atoms/button/index.js';
	import * as DropdownMenu from '$components/ui/molecules/dropdown-menu/index.js';
	import { cn } from '$lib/utils';
	import GlobeIcon from '@lucide/svelte/icons/globe';

	/**
	 * @typedef {object} Language
	 * @property {string} code - The unique locale code (e.g., "en", "de").
	 * @property {string} label - The human-readable language name shown in the UI.
	 */

	/**
	 * @typedef {object} LanguageSwitcherProps
	 * @property {Language[]} languages - The list of available languages to pick from.
	 * @property {string} [value] - The currently selected language code.
	 * @property {'start' | 'center' | 'end'} [align] - How the dropdown menu aligns relative to the
	 *   trigger.
	 * @property {'outline' | 'ghost'} [variant] - Button style variant used for the trigger.
	 * @property {(code: string) => void} [onChange] - Callback invoked when a different language is
	 *   selected.
	 * @property {string} [class] - Additional CSS classes for the trigger button.
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
