<script>
	/** @import {Locale} from '$lib/paraglide/runtime' */
	import { page } from '$app/stores';
	import { LanguageSwitcher } from '$components/ui/molecules/language-switcher/index.js';
	import { sections } from '$lib/constans/index.js';
	import {
		getLocale,
		setLocale,
		locales as availableLocales,
		isLocale
	} from '$lib/paraglide/runtime.js';
	import { createSignal } from '$lib/utils';
	import { cn } from '$lib/utils';
	import Logo from '../../atoms/logo/logo.svelte';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import CloseIcon from '@lucide/svelte/icons/x';
	import { fade } from 'svelte/transition';

	/** @type {Partial<Record<Locale, string>>} */
	const languageLabels = {
		en: 'English',
		es: 'Español'
	};
	const languages = availableLocales.map((code) => ({
		code,
		label: languageLabels[code] ?? code.toUpperCase()
	}));

	const [currentSection, setCurrentSection] = createSignal(sections.home.href);
	const [showMenu, setShowMenu] = createSignal(false);
	const [menuHeight, setMenuHeight] = createSignal(false);

	const isScrolled = $derived(currentSection() !== sections.home.href);
	let currentLang = $derived(getLocale());

	$effect(() => {
		const stateHash = /** @type {{ hash: string | undefined }} */ ($page.state);

		if (stateHash.hash) {
			setCurrentSection(stateHash.hash);
		}
	});
</script>

{#snippet anchor(/** @type {string} */ href, /** @type {string} */ name)}
	<li>
		<a
			{href}
			class={cn(
				'font-raleway font-light underline-offset-6',
				currentSection() === href ? 'underline' : 'no-underline'
			)}>{name}</a
		>
	</li>
{/snippet}

{#snippet anchorResponsive(/** @type {string} */ href, /** @type {string} */ name)}
	<li>
		<a
			{href}
			class={cn(
				'font-raleway text-2xl font-light underline-offset-6',
				currentSection() === href ? 'underline' : 'no-underline'
			)}
			onclick={() => {
				setShowMenu(false);
			}}>{name}</a
		>
	</li>
{/snippet}

<nav
	class={cn(
		'fixed z-10 w-full px-8 transition-all duration-200 md:duration-400',
		isScrolled ? 'py-3' : 'py-8',
		showMenu() ? 'bg-background' : isScrolled ? 'md:bg-gray-50/60' : 'transparent',
		isScrolled ? 'backdrop-blur-md' : 'backdrop-blur-none',
		menuHeight() ? 'h-full md:h-auto' : 'h-auto'
	)}
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a href="#home" title="Home">
			<Logo size={4} />
		</a>

		<menu class="hidden items-center justify-between space-x-6 md:flex">
			{@render anchor(sections.home.href, sections.home.name)}
			{@render anchor(sections.aboutMe.href, sections.aboutMe.name)}
			{@render anchor(sections.skills.href, sections.skills.name)}
			{@render anchor(sections.projects.href, sections.projects.name)}
			{@render anchor(sections.contact.href, sections.contact.name)}
			<LanguageSwitcher
				{languages}
				variant="ghost"
				bind:value={currentLang}
				onChange={(code) => {
					if (isLocale(code)) {
						setLocale(code);
					}
				}}
			/>
		</menu>

		<div class="flex justify-center md:hidden">
			<button
				aria-label="Menu"
				onclick={() => {
					setShowMenu(!showMenu());
				}}
			>
				{#if showMenu()}
					<div in:fade>
						<CloseIcon />
					</div>
				{:else}
					<div in:fade>
						<MenuIcon />
					</div>
				{/if}
			</button>
		</div>
	</div>

	{#if showMenu()}
		<menu
			transition:fade={{ duration: 100 }}
			onoutroend={() => {
				setMenuHeight(false);
			}}
			onintrostart={() => {
				setMenuHeight(true);
			}}
			class="flex h-full flex-col justify-center gap-6 py-12 md:hidden"
		>
			{@render anchorResponsive(sections.home.href, sections.home.name)}
			{@render anchorResponsive(sections.aboutMe.href, sections.aboutMe.name)}
			{@render anchorResponsive(sections.skills.href, sections.skills.name)}
			{@render anchorResponsive(sections.projects.href, sections.projects.name)}
			{@render anchorResponsive(sections.contact.href, sections.contact.name)}
			<LanguageSwitcher
				{languages}
				class="mt-auto self-start"
				align="start"
				bind:value={currentLang}
				onChange={(code) => {
					if (isLocale(code)) {
						setLocale(code);
					}
				}}
			/>
		</menu>
	{/if}
</nav>
