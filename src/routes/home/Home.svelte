<script>
	import { replaceState } from '$app/navigation';
	import { sections } from '$lib/constans/index.js';
	import { createSignal } from '$lib/utils';
	import Companies from './components/ui/organisms/companies/Companies.svelte';
	import Contact from './components/ui/organisms/contact/Contact.svelte';
	import Features from './components/ui/organisms/features/Features.svelte';
	import Headline from './components/ui/organisms/headline/Headline.svelte';
	import Introduction from './components/ui/organisms/introduction/Introduction.svelte';
	import Projects from './components/ui/organisms/projects/Projects.svelte';
	import { extend } from '@threlte/core';
	import {
		PointLight,
		PolyhedronGeometry,
		MeshStandardMaterial,
		PerspectiveCamera,
		PlaneGeometry
	} from 'three/webgpu';

	extend({
		PointLight,
		PolyhedronGeometry,
		MeshStandardMaterial,
		PerspectiveCamera,
		PlaneGeometry
	});

	const [pageTitle, setPageTitle] = createSignal('Home');
</script>

<svelte:head>
	<title>Carlos Gomez - {pageTitle()}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div id="main-target" class="relative h-dvh w-full overflow-auto">
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
	<Companies>
		{#snippet contact()}
			<Contact
				onVisible={() => {
					setPageTitle(sections.contact.name);
					replaceState(sections.contact.href, { hash: sections.contact.href });
				}}
			/>
		{/snippet}
	</Companies>
</div>
