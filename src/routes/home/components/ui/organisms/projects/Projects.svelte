<script>
	/** @import {Snippet} from "svelte" */
	import { Button } from '$components/ui/atoms/button/index.js';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import ProjectElement from './ProjectElement.svelte';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { inView } from 'motion';
	import IconUIKitten from '~icons/arcticons/landofkittens';
	import IconCSS from '~icons/bxl/css3';
	import IconFirebase from '~icons/bxl/firebase';
	import IconGoogle from '~icons/bxl/google';
	import IconReact from '~icons/bxl/react';
	import IconRedux from '~icons/bxl/redux';
	import IconTailwind from '~icons/bxl/tailwind-css';
	import IconLinux from '~icons/cib/linux';
	import IconJest from '~icons/devicon-plain/jest';
	import IconPlaywright from '~icons/devicon-plain/playwright';
	import IconRust from '~icons/devicon-plain/rust';
	import IconStyledComponents from '~icons/devicon-plain/styledcomponents';
	import IconTypescript from '~icons/devicon-plain/typescript';
	import IconZustand from '~icons/devicon-plain/zustand';
	import IconOpen from '~icons/material-symbols-light/open-in-new';
	import IconOnesignal from '~icons/mdi/radar';
	import IconAntd from '~icons/simple-icons/antdesign';
	import IconExpo from '~icons/simple-icons/expo';
	import IconI18next from '~icons/simple-icons/i18next';
	import IconTanStackQuery from '~icons/simple-icons/reactquery';
	import IconSendgrid from '~icons/simple-icons/sendgrid';
	import IconSocketio from '~icons/simple-icons/socketdotio';

	const FIRST_CARD_INDEX_KEY = 'first';
	const LAST_CARD_INDEX_KEY = 'last';

	const projectsArray = [ottomotoProject, sylndrProject, connectrnProject, prodigosProject];
	/** @type {(HTMLElement | null)[]} */
	const projectsRefs = $state(new Array(projectsArray.length).fill(null));

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	const firstAndLastCard = $state({
		[FIRST_CARD_INDEX_KEY]: 0,
		[LAST_CARD_INDEX_KEY]: 0
	});

	$effect(() => {
		if (projectsContainerRef) {
			const stop = inView(
				projectsContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.5 }
			);

			return () => {
				stop();
			};
		}
	});

	const onProjectVisible = (/** @type {number} */ projectIndex) => {
		const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
		const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

		if (projectIndex < firstCard) {
			firstAndLastCard[FIRST_CARD_INDEX_KEY] = projectIndex;
		}

		if (projectIndex > lastCard) {
			firstAndLastCard[LAST_CARD_INDEX_KEY] = projectIndex;
		}
	};
	const onProjectHidden = (/** @type {number} */ projectIndex) => {
		const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
		const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

		if (projectIndex === firstCard) {
			firstAndLastCard[FIRST_CARD_INDEX_KEY] = projectIndex + 1;
		}

		if (projectIndex === lastCard) {
			firstAndLastCard[LAST_CARD_INDEX_KEY] = projectIndex - 1;
		}
	};

	/** @param {'back' | 'forward'} type - Scrollable container */
	function onClickArrowButton(type) {
		if (projectsContainerRef) {
			/**
			 * Scroll parent so child is visible.
			 *
			 * @param {HTMLElement} parent - Scrollable container
			 * @param {HTMLElement} child - Element inside parent to scroll to
			 */
			function scrollParentToChild(parent, child) {
				const parentRect = parent.getBoundingClientRect();
				const childRect = child.getBoundingClientRect();

				const childLeftWithinParent = childRect.left - parentRect.left + parent.scrollLeft;

				let targetScrollLeft;

				targetScrollLeft = childLeftWithinParent - (parent.clientWidth - child.offsetWidth) / 2;

				targetScrollLeft = Math.max(
					0,
					Math.min(targetScrollLeft, parent.scrollWidth - parent.clientWidth)
				);

				parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
			}

			const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
			const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

			switch (type) {
				case 'back': {
					const previousCardRef = projectsRefs[firstCard - 1];
					const lastCardRef = projectsRefs[projectsRefs.length - 1];

					if (previousCardRef) {
						scrollParentToChild(projectsContainerRef, previousCardRef);
					} else if (lastCardRef) {
						scrollParentToChild(projectsContainerRef, lastCardRef);
					}

					break;
				}
				case 'forward': {
					const nextCardRef = projectsRefs[lastCard + 1];
					const firstCardRef = projectsRefs[0];

					if (nextCardRef) {
						scrollParentToChild(projectsContainerRef, nextCardRef);
					} else if (firstCardRef) {
						scrollParentToChild(projectsContainerRef, firstCardRef);
					}

					break;
				}
			}
		}
	}
</script>

{#snippet technologyTag(/** @type {Snippet} */ icon)}
	<div class="inline-block rounded-3xl bg-zinc-800 px-4 py-1">
		<p class="flex items-center gap-1 text-base text-white">
			{@render icon()}
		</p>
	</div>
{/snippet}

{#snippet ottomotoProject(
	/** @type {number} */ projectIndex,
	/** @type {(HTMLElement | null)[]} */ projectsRefs,
	/** @type {HTMLElement | null} */ rootContainerRef,
	/** @type {(projectIndex: number) => void} */ onVisible,
	/** @type {(projectIndex: number) => void} */ onHide
)}
	<ProjectElement
		{projectIndex}
		bind:projectsRef={projectsRefs[projectIndex]}
		{rootContainerRef}
		{onVisible}
		{onHide}
	>
		{#snippet projectType()}
			Web Application
		{/snippet}
		{#snippet projectName()}
			Ottomoto
		{/snippet}
		{#snippet projectDescription()}
			{m.projects_ottomoto_description_web()}
			<strong>{m.projects_ottomoto_description_applications()}</strong>
			{m.projects_ottomoto_description_designed()}
			<strong>{m.projects_ottomoto_description_reports()}</strong>, {m.projects_ottomoto_description_valuation()},
			<strong>{m.projects_ottomoto_description_insurance()}</strong>; {m.projects_ottomoto_description_developing()}
			<strong>{m.projects_ottomoto_description_module()}</strong>; {m.projects_ottomoto_description_creating()}
			<strong>{m.projects_ottomoto_description_e2e()}</strong>; {m.projects_ottomoto_description_modules()}
			<strong>{m.projects_ottomoto_description_architecture()}</strong>.
		{/snippet}
		{#snippet projectDisclaimer()}
			{m.projects_ottomoto_description_owned()}
		{/snippet}
		{#snippet projectTechIcons()}
			{#snippet typescriptIcon()}
				<IconTypescript /> TypeScript
			{/snippet}
			{@render technologyTag(typescriptIcon)}

			{#snippet reactIcon()}
				<IconReact /> React
			{/snippet}
			{@render technologyTag(reactIcon)}

			{#snippet zustandIcon()}
				<IconZustand /> Zustand
			{/snippet}
			{@render technologyTag(zustandIcon)}

			{#snippet tanStackQueryIcon()}
				<IconTanStackQuery /> TanStack Query
			{/snippet}
			{@render technologyTag(tanStackQueryIcon)}

			{#snippet socketioIcon()}
				<IconSocketio fill="white" /> Socket.IO
			{/snippet}
			{@render technologyTag(socketioIcon)}

			{#snippet tailwindIcon()}
				<IconTailwind /> Tailwind
			{/snippet}
			{@render technologyTag(tailwindIcon)}

			{#snippet antdIcon()}
				<IconAntd /> Ant Design
			{/snippet}
			{@render technologyTag(antdIcon)}

			{#snippet playwrightIcon()}
				<IconPlaywright /> Playwright
			{/snippet}
			{@render technologyTag(playwrightIcon)}

			{#snippet jestIcon()}
				<IconJest /> Jest
			{/snippet}
			{@render technologyTag(jestIcon)}
		{/snippet}
	</ProjectElement>
{/snippet}

{#snippet sylndrProject(
	/** @type {number} */ projectIndex,
	/** @type {(HTMLElement | null)[]} */ projectsRefs,
	/** @type {HTMLElement | null} */ rootContainerRef,
	/** @type {(projectIndex: number) => void} */ onVisible,
	/** @type {(projectIndex: number) => void} */ onHide
)}
	<ProjectElement
		{projectIndex}
		bind:projectsRef={projectsRefs[projectIndex]}
		{rootContainerRef}
		{onVisible}
		{onHide}
	>
		{#snippet projectType()}
			<span>Mobile Application</span>
		{/snippet}
		{#snippet projectName()}
			<a
				class="flex items-center gap-2 hover:underline"
				href="https://apps.apple.com/us/app/sylndr/id6472655250"
				target="_blank"
			>
				Sylndr <IconOpen />
			</a>
		{/snippet}
		{#snippet projectDescription()}
			{m.projects_sylndr_description_buying()}
			<strong>{m.projects_sylndr_description_auctioning()}</strong>. {m.projects_sylndr_description_features()}
			<strong>{m.projects_sylndr_description_media()}</strong>
			{m.projects_sylndr_description_engine()}
			<strong>{m.projects_sylndr_description_sound()}</strong>, {m.projects_sylndr_description_bidding()},
			<strong>{m.projects_sylndr_description_push()}</strong>,
			<strong>{m.projects_sylndr_description_multilingual()}</strong>
			{m.projects_sylndr_description_with()}
			<strong>LTR/RTL</strong>
			{m.projects_sylndr_description_integrated()}
			<strong>{m.projects_sylndr_description_viewer()}</strong>.
		{/snippet}
		{#snippet projectDisclaimer()}
			{m.projects_sylndr_description_owned()}
		{/snippet}
		{#snippet projectTechIcons()}
			{#snippet typescriptIcon()}
				<IconTypescript /> TypeScript
			{/snippet}
			{@render technologyTag(typescriptIcon)}

			{#snippet reactNativeIcon()}
				<IconReact /> React Native
			{/snippet}
			{@render technologyTag(reactNativeIcon)}

			{#snippet expoIcon()}
				<IconExpo /> Expo
			{/snippet}
			{@render technologyTag(expoIcon)}

			{#snippet tanStackQueryIcon()}
				<IconTanStackQuery /> TanStack Query
			{/snippet}
			{@render technologyTag(tanStackQueryIcon)}

			{#snippet emotionCSSIcon()}
				<IconCSS /> Emotion CSS
			{/snippet}
			{@render technologyTag(emotionCSSIcon)}

			{#snippet i18nextIcon()}
				<IconI18next /> I18next
			{/snippet}
			{@render technologyTag(i18nextIcon)}

			{#snippet oneSignalIcon()}
				<IconOnesignal /> OneSignal
			{/snippet}
			{@render technologyTag(oneSignalIcon)}
		{/snippet}
	</ProjectElement>
{/snippet}

{#snippet connectrnProject(
	/** @type {number} */ projectIndex,
	/** @type {(HTMLElement | null)[]} */ projectsRefs,
	/** @type {HTMLElement | null} */ rootContainerRef,
	/** @type {(projectIndex: number) => void} */ onVisible,
	/** @type {(projectIndex: number) => void} */ onHide
)}
	<ProjectElement
		{projectIndex}
		bind:projectsRef={projectsRefs[projectIndex]}
		{rootContainerRef}
		{onVisible}
		{onHide}
	>
		{#snippet projectType()}
			Mobile and Web Application
		{/snippet}
		{#snippet projectName()}
			<a
				class="flex items-center gap-2 hover:underline"
				href="https://apps.apple.com/us/app/connectrn/id989863718"
				target="_blank"
			>
				ConnectRN <IconOpen />
			</a>
		{/snippet}
		{#snippet projectDescription()}
			{m.projects_connectrn_description_connects()}
			<strong>{m.projects_connectrn_description_shift()}</strong>,
			<strong>{m.projects_connectrn_description_scheduling()}</strong>, {m.projects_connectrn_description_geolocation()}
			<strong>{m.projects_connectrn_description_signatures()}</strong>. {m.projects_connectrn_description_modules()}
			<strong>{m.projects_connectrn_description_dashboard()}</strong>.
		{/snippet}
		{#snippet projectDisclaimer()}
			{m.projects_connectrn_description_owned()}
		{/snippet}
		{#snippet projectTechIcons()}
			{#snippet typescriptIcon()}
				<IconTypescript /> TypeScript
			{/snippet}
			{@render technologyTag(typescriptIcon)}

			{#snippet reactIcon()}
				<IconReact /> React
			{/snippet}
			{@render technologyTag(reactIcon)}

			{#snippet reactNativeIcon()}
				<IconReact /> React Native
			{/snippet}
			{@render technologyTag(reactNativeIcon)}

			{#snippet reduxIcon()}
				<IconRedux /> Redux
			{/snippet}
			{@render technologyTag(reduxIcon)}

			{#snippet UIKittenIcon()}
				<IconUIKitten /> UI Kitten
			{/snippet}
			{@render technologyTag(UIKittenIcon)}

			{#snippet sendgridIcon()}
				<IconSendgrid /> SendGrid
			{/snippet}
			{@render technologyTag(sendgridIcon)}
		{/snippet}
	</ProjectElement>
{/snippet}

{#snippet prodigosProject(
	/** @type {number} */ projectIndex,
	/** @type {(HTMLElement | null)[]} */ projectsRefs,
	/** @type {HTMLElement | null} */ rootContainerRef,
	/** @type {(projectIndex: number) => void} */ onVisible,
	/** @type {(projectIndex: number) => void} */ onHide
)}
	<ProjectElement
		{projectIndex}
		bind:projectsRef={projectsRefs[projectIndex]}
		{rootContainerRef}
		{onVisible}
		{onHide}
	>
		{#snippet projectType()}
			Mobile and Web Application
		{/snippet}
		{#snippet projectName()}
			Pródigos App
		{/snippet}
		{#snippet projectDescription()}
			<strong>{m.projects_prodigos_description_app()}</strong>
			{m.projects_prodigos_description_nurses()}
			<strong>{m.projects_prodigos_description_payment()}</strong>,
			<strong>{m.projects_prodigos_description_scheduling()}</strong>,
			<strong>{m.projects_prodigos_description_map()}</strong>, {m.projects_prodigos_description_dashboard()}
		{/snippet}
		{#snippet projectDisclaimer()}
			{m.projects_prodigos_description_owned()}
		{/snippet}
		{#snippet projectTechIcons()}
			{#snippet typescriptIcon()}
				<IconTypescript /> TypeScript
			{/snippet}
			{@render technologyTag(typescriptIcon)}

			{#snippet reactIcon()}
				<IconReact /> React
			{/snippet}
			{@render technologyTag(reactIcon)}

			{#snippet reactNativeIcon()}
				<IconReact /> React Native
			{/snippet}
			{@render technologyTag(reactNativeIcon)}

			{#snippet reduxIcon()}
				<IconRedux /> Redux
			{/snippet}
			{@render technologyTag(reduxIcon)}

			{#snippet firebaseIcon()}
				<IconFirebase /> Firebase
			{/snippet}
			{@render technologyTag(firebaseIcon)}

			{#snippet styledComponentsIcon()}
				<IconStyledComponents /> Styled Components
			{/snippet}
			{@render technologyTag(styledComponentsIcon)}

			{#snippet mapsIcon()}
				<IconGoogle /> Maps
			{/snippet}
			{@render technologyTag(mapsIcon)}
		{/snippet}
	</ProjectElement>
{/snippet}

<section id={sections.projects.id} class="flex min-h-dvh flex-col justify-center bg-gray-50 py-20">
	<div class="space-y-10">
		<h2 class="text-center font-raleway text-6xl font-black md:text-8xl">
			{m.projects_title()}
		</h2>

		<ul
			bind:this={projectsContainerRef}
			class="scrollbar-hide grid snap-x snap-mandatory grid-flow-col gap-x-6 overflow-x-scroll px-[calc(50%-min(460px,87.5%)/2)] py-2 md:px-[calc(50%-min(1260px,87.5%)/2)]"
		>
			{#each projectsArray as project, i}
				{@render project(i, projectsRefs, projectsContainerRef, onProjectVisible, onProjectHidden)}
			{/each}
		</ul>

		<div class="mx-auto flex max-w-7xl justify-end gap-5 px-3">
			<Button
				variant="default"
				size="icon"
				class="size-16 rounded-full"
				disabled={firstAndLastCard[FIRST_CARD_INDEX_KEY] === 0}
				onclick={() => onClickArrowButton('back')}
				title={m.button_previous_project()}
			>
				<ChevronLeftIcon aria-hidden="true" role="presentation" class="size-8" />
			</Button>

			<Button
				variant="default"
				size="icon"
				class="size-16 rounded-full"
				disabled={firstAndLastCard[LAST_CARD_INDEX_KEY] === projectsArray.length - 1}
				onclick={() => onClickArrowButton('forward')}
				title={m.button_next_project()}
			>
				<ChevronRightIcon aria-hidden="true" role="presentation" class="size-8" />
			</Button>
		</div>
	</div>
</section>
