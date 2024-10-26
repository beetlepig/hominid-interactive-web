<script>
	import '../app.css';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/oswald';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { css } from 'styled-system/css';
	import Logo from '../components/atoms/Logo.svelte';
	import { page } from '$app/stores';
	import { createSignal } from '$lib';
	let { children } = $props();

	const sections = {
		home: { name: 'Home', href: '#home' },
		aboutMe: { name: 'About Me', href: '#about-me' }
	};

	const [currentSection, setCurrentSection] = createSignal(sections.home.href);

	$effect(() => {
		const stateHash = /** @type {{hash: string | undefined}} */ ($page.state);

		if (stateHash.hash) {
			setCurrentSection(stateHash.hash);
		}
	});
</script>

<ParaglideJS {i18n}>
	<nav class={css({ position: 'fixed', zIndex: '1', width: 'full', padding: '4' })}>
		<div class={css({ mx: 'auto', display: 'flex', justifyContent: 'space-between', maxW: '7xl' })}>
			<a href={'#home'} aria-label={'Home'} title={'Home'}>
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
				<li>
					<a
						href={sections.home.href}
						class={css({ color: currentSection() === sections.home.href ? 'red.600' : 'black' })}
						>{sections.home.name}</a
					>
				</li>
				<li>
					<a
						href={sections.aboutMe.href}
						class={css({ color: currentSection() === sections.aboutMe.href ? 'red.600' : 'black' })}
						>{sections.aboutMe.name}</a
					>
				</li>
				<li>Skills</li>
				<li>Projects</li>
				<li>Chat</li>
			</menu>
		</div>
	</nav>

	{@render children()}
</ParaglideJS>
