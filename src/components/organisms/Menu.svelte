<script>
	import { page } from '$app/stores';
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans';
	import Logo from '../atoms/Logo.svelte';
	import { css } from 'styled-system/css';
	import { fade } from 'svelte/transition';

	const [currentSection, setCurrentSection] = createSignal(sections.home.href);
	const [showMenu, setShowMenu] = createSignal(false);
	const [menuHeight, setMenuHeight] = createSignal(false);

	const isScrolled = $derived(currentSection() !== sections.home.href);

	$effect(() => {
		const stateHash = /** @type {{hash: string | undefined}} */ ($page.state);

		if (stateHash.hash) {
			setCurrentSection(stateHash.hash);
		}
	});
</script>

{#snippet anchor(/** @type {string} */ href, /** @type {string} */ name)}
	<li>
		<a
			{href}
			class={css({
				textDecoration: currentSection() === href ? 'underline' : 'none',
				textUnderlineOffset: '6',
				fontFamily: 'raleway',
				fontWeight: 'light'
			})}>{name}</a
		>
	</li>
{/snippet}

{#snippet anchorResponsive(/** @type {string} */ href, /** @type {string} */ name)}
	<li>
		<a
			{href}
			class={css({
				textDecoration: currentSection() === href ? 'underline' : 'none',
				textUnderlineOffset: '6',
				fontFamily: 'raleway',
				fontWeight: 'light',
				fontSize: '2xl'
			})}
			onclick={() => {
				setShowMenu(false);
			}}>{name}</a
		>
	</li>
{/snippet}

<nav
	class={css({
		position: 'fixed',
		zIndex: '1',
		width: 'full',
		paddingY: isScrolled ? '3' : '8',
		paddingX: '8',
		transition: 'all',
		transitionDuration: 'normal',
		bgColor: showMenu() ? 'white' : isScrolled ? 'gray.50/60' : 'transparent',
		backdropFilter: isScrolled ? 'auto' : '[none]',
		backdropBlur: 'md',
		height: menuHeight() ? 'full' : 'auto',
		md: {
			height: 'auto',
			bgColor: isScrolled ? 'gray.50/60' : 'transparent',
			transitionDuration: 'slow'
		}
	})}
>
	<div
		class={css({
			mx: 'auto',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			maxW: '7xl'
		})}
	>
		<a href="#home" title="Home">
			<Logo size={4} />
		</a>
		<menu
			class={css({
				display: 'flex',
				spaceX: '6',
				justifyContent: 'space-between',
				alignItems: 'center',
				hideBelow: 'md'
			})}
		>
			{@render anchor(sections.home.href, sections.home.name)}
			{@render anchor(sections.aboutMe.href, sections.aboutMe.name)}
			{@render anchor(sections.skills.href, sections.skills.name)}
			{@render anchor(sections.projects.href, sections.projects.name)}
			{@render anchor(sections.contact.href, sections.contact.name)}
		</menu>
		<div class={css({ hideFrom: 'md', display: 'flex', justifyContent: 'center' })}>
			<button
				aria-label="Menu"
				onclick={() => {
					setShowMenu(!showMenu());
				}}
			>
				{#if showMenu()}
					<svg
						in:fade
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
					>
						<path
							d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{:else}
					<svg
						in:fade
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
					>
						<path
							d="M3 5H21"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3 12H21"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3 19H21"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
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
			class={css({ hideFrom: 'md', h: 'full', spaceY: '6', py: '12' })}
		>
			{@render anchorResponsive(sections.home.href, sections.home.name)}
			{@render anchorResponsive(sections.aboutMe.href, sections.aboutMe.name)}
			{@render anchorResponsive(sections.skills.href, sections.skills.name)}
			{@render anchorResponsive(sections.projects.href, sections.projects.name)}
			{@render anchorResponsive(sections.contact.href, sections.contact.name)}
		</menu>
	{/if}
</nav>
