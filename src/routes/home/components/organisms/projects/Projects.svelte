<script>
	/** @import { Snippet } from 'svelte' */
	import { createSignal } from '$lib';
	import { Button } from '$lib/components/ui/button/index.js';
	import { sections } from '$lib/constans';
	import { m } from '$lib/paraglide/messages.js';
	import ProjectElement from './ProjectElement.svelte';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';
	import { SvelteSet } from 'svelte/reactivity';
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

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let firstSlideRef = $state(null);
	/** @type {HTMLElement | null} */
	let secondSlideRef = $state(null);
	/** @type {HTMLElement | null} */
	let thirdSlideRef = $state(null);
	/** @type {HTMLElement | null} */
	let fourthSlideRef = $state(null);
	/** @type {HTMLElement | null} */
	let fifthSlideRef = $state(null);

	const [visibleCards] = /** @type {typeof createSignal<SvelteSet<number>>} */ (createSignal)(
		new SvelteSet()
	);

	const minMaxCardNumbers = $derived.by(() => {
		/**
		 * Get the minimum and maximum values in a set.
		 * @param {SvelteSet<number>} set
		 */
		function minMaxInSet(set) {
			if (set.size === 0) return { min: null, max: null };

			let min = Infinity;
			let max = -Infinity;

			for (const v of set) {
				if (v < min) min = v;
				if (v > max) max = v;
			}

			return min === Infinity ? { min: null, max: null } : { min, max };
		}

		return minMaxInSet(visibleCards());
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

	$effect(() => {
		if (firstSlideRef && projectsContainerRef) {
			const stop = inView(
				firstSlideRef,
				() => {
					visibleCards().add(1);

					return () => {
						visibleCards().delete(1);
					};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (secondSlideRef && projectsContainerRef) {
			const stop = inView(
				secondSlideRef,
				() => {
					visibleCards().add(2);

					return () => {
						visibleCards().delete(2);
					};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (thirdSlideRef && projectsContainerRef) {
			const stop = inView(
				thirdSlideRef,
				() => {
					visibleCards().add(3);

					return () => {
						visibleCards().delete(3);
					};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (fourthSlideRef && projectsContainerRef) {
			const stop = inView(
				fourthSlideRef,
				() => {
					visibleCards().add(4);

					return () => {
						visibleCards().delete(4);
					};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (fifthSlideRef && projectsContainerRef) {
			const stop = inView(
				fifthSlideRef,
				() => {
					visibleCards().add(5);

					return () => {
						visibleCards().delete(5);
					};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	/**
	 * @param {'back' | 'forward'} type - scrollable container
	 */
	function onClickArrowButton(type) {
		if (
			projectsContainerRef &&
			firstSlideRef &&
			secondSlideRef &&
			thirdSlideRef &&
			fourthSlideRef &&
			fifthSlideRef
		) {
			/**
			 * Scroll parent so child is visible.
			 * @param {HTMLElement} parent - scrollable container
			 * @param {HTMLElement} child  - element inside parent to scroll to
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

			switch (
				type === 'back'
					? minMaxCardNumbers.min
						? minMaxCardNumbers.min - 1
						: 1
					: minMaxCardNumbers.max
						? minMaxCardNumbers.max + 1
						: 5
			) {
				case 1: {
					scrollParentToChild(projectsContainerRef, firstSlideRef);
					break;
				}
				case 2: {
					scrollParentToChild(projectsContainerRef, secondSlideRef);
					break;
				}
				case 3: {
					scrollParentToChild(projectsContainerRef, thirdSlideRef);
					break;
				}
				case 4: {
					scrollParentToChild(projectsContainerRef, fourthSlideRef);
					break;
				}
				case 5: {
					scrollParentToChild(projectsContainerRef, fifthSlideRef);
					break;
				}
				default: {
					scrollParentToChild(projectsContainerRef, firstSlideRef);
				}
			}
		}
	}
</script>

{#snippet technologyTag(/** @type {Snippet} */ icon)}
	<div
		class={css({
			bgColor: 'zinc.800',
			paddingY: '1',
			paddingX: '4',
			display: 'inline-block',
			rounded: '3xl'
		})}
	>
		<p
			class={css({
				display: 'flex',
				alignItems: 'center',
				gap: '1',
				fontSize: 'md',
				color: 'white'
			})}
		>
			{@render icon()}
		</p>
	</div>
{/snippet}

<section
	id={sections.projects.id}
	class={css({
		display: 'flex',
		flexDir: 'column',
		justifyContent: 'center',
		bgColor: 'gray.50',
		py: '20',
		minH: '[100dvh]'
	})}
>
	<div
		class={css({
			spaceY: '10'
		})}
	>
		<h2
			class={css({
				textAlign: 'center',
				fontFamily: 'raleway',
				fontWeight: 'black',
				fontSize: '6xl',
				md: {
					fontSize: '8xl'
				}
			})}
		>
			{m.projects_title()}
		</h2>

		<ul
			bind:this={projectsContainerRef}
			class="scrollbar-hide grid snap-x snap-mandatory grid-flow-col gap-x-6 overflow-x-scroll px-[calc(50%-min(460px,87.5%)/2)] py-2 md:px-[calc(50%-min(1260px,87.5%)/2)]"
		>
			<ProjectElement bind:ref={firstSlideRef}>
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

			<ProjectElement bind:ref={secondSlideRef}>
				{#snippet projectType()}
					<span>Mobile Application</span>
				{/snippet}
				{#snippet projectName()}
					Sylndr
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

			<ProjectElement bind:ref={thirdSlideRef}>
				{#snippet projectType()}
					Mobile and Web Application
				{/snippet}
				{#snippet projectName()}
					ConnectRN
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

			<ProjectElement bind:ref={fourthSlideRef}>
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

			<ProjectElement bind:ref={fifthSlideRef}>
				{#snippet projectType()}
					System Service
				{/snippet}
				{#snippet projectName()}
					<a
						class={css({
							display: 'flex',
							alignItems: 'center',
							gap: '2',
							_hover: { textDecoration: 'underline' }
						})}
						href="https://github.com/beetlepig/argon-one-v2-services"
						target="_blank"
					>
						Argon ONE System Service <IconOpen />
					</a>
				{/snippet}
				{#snippet projectDescription()}
					{m.projects_argon_description_lightweight()}
					<strong>{m.projects_argon_description_service()}</strong>
					{m.projects_argon_description_case()}
					<strong>{m.projects_argon_description_fan()}</strong>
					{m.projects_argon_description_smooth()}
					<strong>{m.projects_argon_description_temperature()}</strong>
					{m.projects_argon_description_customize()}
					<strong>{m.projects_argon_description_button()}</strong>
					{m.projects_argon_description_shutdown()} <strong>systemd</strong>
					{m.projects_argon_description_built()}
				{/snippet}
				{#snippet projectDisclaimer()}
					{m.projects_argon_description_owned()}
				{/snippet}
				{#snippet projectTechIcons()}
					{#snippet rustIcon()}
						<IconRust /> Rust
					{/snippet}
					{@render technologyTag(rustIcon)}

					{#snippet linuxIcon()}
						<IconLinux /> Linux
					{/snippet}
					{@render technologyTag(linuxIcon)}
				{/snippet}
			</ProjectElement>
		</ul>

		<div
			class={css({
				mx: 'auto',
				maxW: '7xl',
				display: 'flex',
				gap: '5',
				px: '3',
				justifyContent: 'end'
			})}
		>
			<button
				class={css({
					p: '3',
					fontSize: '2xl',
					rounded: 'full',
					bgColor: 'gray.200',
					color: 'gray.600',
					opacity: minMaxCardNumbers.min ? (minMaxCardNumbers.min <= 1 ? '0.6' : '1') : '1',
					_hover: { bgColor: 'gray.200/70', cursor: 'pointer' },
					_active: { scale: '[0.95]', transition: 'all' }
				})}
				disabled={minMaxCardNumbers.min ? minMaxCardNumbers.min <= 1 : false}
				onclick={() => onClickArrowButton('back')}
			>
				<ChevronLeftIcon class="size-8" />
			</button>

			<Button
				variant="default"
				size="icon"
				class="size-16 rounded-full"
				disabled={minMaxCardNumbers.max ? minMaxCardNumbers.max >= 5 : false}
				onclick={() => onClickArrowButton('forward')}
			>
				<ChevronRightIcon class="size-8" />
			</Button>
		</div>
	</div>
</section>
