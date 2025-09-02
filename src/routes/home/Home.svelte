<script>
	import { replaceState } from '$app/navigation';
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import Companies from './components/organisms/companies/Companies.svelte';
	import Features from './components/organisms/features/Features.svelte';
	import Headline from './components/organisms/headline/Headline.svelte';
	import Introduction from './components/organisms/introduction/Introduction.svelte';
	import Projects from './components/organisms/projects/Projects.svelte';
	import { css } from 'styled-system/css';

	const [pageTitle, setPageTitle] = createSignal('Home');
</script>

<svelte:head>
	<title>Carlos Gomez - {pageTitle()}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div
	id="main-target"
	class={css({
		position: 'relative',
		h: 'screen',
		w: 'full',
		overflow: 'auto'
	})}
>
	<Headline
		onVisible={() => {
			setPageTitle(sections.home.name);
			replaceState(sections.home.href, { hash: sections.home.href });
		}}
	/>
	<Introduction
		onVisible={() => {
			setPageTitle(sections.aboutMe.name);
			replaceState(sections.aboutMe.href, { hash: sections.aboutMe.href });
		}}
	/>
	<Features
		onVisible={() => {
			setPageTitle(sections.skills.name);
			replaceState(sections.skills.href, { hash: sections.skills.href });
		}}
	/>
	<Projects
		onVisible={() => {
			setPageTitle(sections.projects.name);
			replaceState(sections.projects.href, { hash: sections.projects.href });
		}}
	/>
	<Companies
		onVisible={() => {
			setPageTitle(sections.companies.name);
			replaceState(sections.companies.href, { hash: sections.companies.href });
		}}
	/>
</div>
