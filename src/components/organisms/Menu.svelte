<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans';
	import Logo from '../atoms/Logo.svelte';
	import { createSignal, useScroll } from '$lib';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	/**
	 * @type {HTMLElement | null}
	 */
	const container = browser ? document.getElementById('overflow-container') : null;
	/**
	 * @type {HTMLElement | null}
	 */
	const target = browser ? document.getElementById(sections.aboutMe.id) : null;

	const { scrollYProgress } = useScroll({
		target,
		container
	});
	const isScrolled = $derived(scrollYProgress() > 0);

	const [currentSection, setCurrentSection] = createSignal(sections.home.href);

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

<nav
	class={css({
		position: 'fixed',
		zIndex: '1',
		width: 'full',
		padding: isScrolled ? '3' : '8',
		transition: 'all',
		transitionDuration: 'slowest',
		bgColor: isScrolled ? 'white/60' : 'transparent',
		backdropFilter: isScrolled ? 'auto' : '[none]',
		backdropBlur: 'md'
	})}
>
	<div
		class={css({
			mx: 'auto',
			display: 'flex',
			justifyContent: 'space-between',
			maxW: '7xl'
		})}
	>
		<a href={'#home'} title={'Home'}>
			<Logo size={4} />
		</a>
		<menu
			class={css({
				display: 'flex',
				spaceX: '6',
				justifyContent: 'space-between',
				alignItems: 'center'
			})}
		>
			{@render anchor(sections.home.href, sections.home.name)}
			{@render anchor(sections.aboutMe.href, sections.aboutMe.name)}
			{@render anchor(sections.skills.href, sections.skills.name)}
			{@render anchor(sections.projects.href, sections.projects.name)}
			{@render anchor(sections.chat.href, sections.chat.name)}
		</menu>
	</div>
</nav>
