<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans';
	import Logo from '../atoms/Logo.svelte';
	import { createSignal } from '$lib';
	import { page } from '$app/stores';

	const [currentSection, setCurrentSection] = createSignal(sections.home.href);

	$effect(() => {
		console.log($page.state);
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

<nav class={css({ position: 'fixed', zIndex: '1', width: 'full', padding: '7' })}>
	<div class={css({ mx: 'auto', display: 'flex', justifyContent: 'space-between', maxW: '7xl' })}>
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
