<script>
	/** @import { AnimationSectionEnumType } from './components/organisms/polyhedron-scene/PolyhedronSequence.svelte' */

	import { css } from 'styled-system/css';
	import Introduction from './components/molecules/introduction/Introduction.svelte';
	import Headline from './components/molecules/headline/Headline.svelte';
	import Features from './components/molecules/features/Features.svelte';
	import Projects from './components/molecules/projects/Projects.svelte';
	import Chat from './components/molecules/chat/Chat.svelte';
	import { replaceState } from '$app/navigation';
	import { sections } from '$lib/constans/index.js';
	import { createSignal } from '$lib';

	/** @type {HTMLElement} */
	let headlineContainerRef;

	const [pageTitle, setPageTitle] = createSignal('Home');
</script>

<svelte:head>
	<title>Hominid Interactive - {pageTitle()}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div
	id={'main-target'}
	class={css({
		position: 'relative',
		h: 'screen',
		w: 'full',
		overflow: 'auto'
	})}
>
	<Headline
		bind:headlineContainerRef
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
	<Chat
		onVisible={() => {
			setPageTitle(sections.chat.name);
			replaceState(sections.chat.href, { hash: sections.chat.href });
		}}
	/>
</div>
