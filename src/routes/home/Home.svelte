<script>
	import { activeNavigationHashState } from '$components/ui/organisms/menu';
	import { sections } from '$lib/constans/index.js';
	import { createSignal } from '$lib/utils';
	import Companies from './components/ui/organisms/companies/Companies.svelte';
	import Contact from './components/ui/organisms/contact/Contact.svelte';
	import Features from './components/ui/organisms/features/Features.svelte';
	import Headline from './components/ui/organisms/headline/Headline.svelte';
	import Introduction from './components/ui/organisms/introduction/Introduction.svelte';
	import Projects from './components/ui/organisms/projects/Projects.svelte';

	const [pageTitle, setPageTitle] = createSignal('Home');
	const [, setNavigationHash] = activeNavigationHashState;

	/**
	 * Sets the active section by updating the page title and the URL hash.
	 *
	 * @param {string} name - Human-readable section name used for the document title.
	 * @param {string} href - Section hash (for example, "#about") stored in navigation state.
	 * @returns {void}
	 */
	const setActiveSection = (name, href) => {
		setPageTitle(name);
		setNavigationHash(href);
	};
</script>

<svelte:head>
	<title>Carlos Gomez - {pageTitle()}</title>
	<meta
		name="description"
		content="Explore the portfolio of Carlos Gomez, a front-end engineer specializing in React, React Native. See projects, skills, experience and contact."
	/>
</svelte:head>

<div id="main-target" class="relative h-dvh w-full overflow-auto">
	<Headline
		onVisible={() => {
			setActiveSection(sections.home.name, sections.home.href);
		}}
	/>
	<Introduction
		onVisible={() => {
			setActiveSection(sections.aboutMe.name, sections.aboutMe.href);
		}}
	/>
	<Features
		onVisible={() => {
			setActiveSection(sections.skills.name, sections.skills.href);
		}}
	/>
	<Projects
		onVisible={() => {
			setActiveSection(sections.projects.name, sections.projects.href);
		}}
	/>
	<Companies>
		{#snippet contact()}
			<Contact
				onVisible={() => {
					setActiveSection(sections.contact.name, sections.contact.href);
				}}
			/>
		{/snippet}
	</Companies>
</div>
