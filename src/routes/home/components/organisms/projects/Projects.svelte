<script>
	/** @import { Snippet } from 'svelte' */
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans';
	import { m } from '$lib/paraglide/messages.js';
	import ProjectElement from './ProjectElement.svelte';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';
	import IconUIKitten from '~icons/arcticons/landofkittens';
	import IconCSS from '~icons/bxl/css3';
	import IconFirebase from '~icons/bxl/firebase';
	import IconGoogle from '~icons/bxl/google';
	import IconReact from '~icons/bxl/react';
	import IconRedux from '~icons/bxl/redux';
	import IconTailwind from '~icons/bxl/tailwind-css';
	import IconCaregiver from '~icons/carbon/airline-passenger-care';
	import IconLinux from '~icons/cib/linux';
	import IconJest from '~icons/devicon-plain/jest';
	import IconPlaywright from '~icons/devicon-plain/playwright';
	import IconRust from '~icons/devicon-plain/rust';
	import IconStyledComponents from '~icons/devicon-plain/styledcomponents';
	import IconTypescript from '~icons/devicon-plain/typescript';
	import IconZustand from '~icons/devicon-plain/zustand';
	import IconCare from '~icons/iconoir/healthcare';
	import IconOpen from '~icons/material-symbols-light/open-in-new';
	import IconArrowBackward from '~icons/material-symbols/arrow-back-ios';
	import IconCar from '~icons/material-symbols/car-tag-outline';
	import IconOnesignal from '~icons/mdi/radar';
	import IconRaspberry from '~icons/mdi/raspberry-pi';
	import IconAuction from '~icons/ri/auction-line';
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

	const [currentSlide, setCurrentSlide] = /** @type {typeof createSignal<number>} */ (createSignal)(
		1
	);

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
					setCurrentSlide(1);

					return () => {};
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
					setCurrentSlide(2);

					return () => {};
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
					setCurrentSlide(3);

					return () => {};
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
					setCurrentSlide(4);

					return () => {};
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
					setCurrentSlide(5);

					return () => {};
				},
				{ root: projectsContainerRef, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	/**
	 * Scroll parent so child is visible.
	 * @param {HTMLElement} parent - scrollable container
	 * @param {HTMLElement} child  - element inside parent to scroll to
	 */
	function scrollParentToChild(parent, child) {
		// bounding rects for robust relative position (handles transforms, margins, etc.)
		const parentRect = parent.getBoundingClientRect();
		const childRect = child.getBoundingClientRect();

		// child's left within parent's scrollable content:
		const childLeftWithinParent = childRect.left - parentRect.left + parent.scrollLeft;

		let targetScrollLeft;

		targetScrollLeft = childLeftWithinParent - (parent.clientWidth - child.offsetWidth) / 2;

		// clamp to valid range:
		targetScrollLeft = Math.max(
			0,
			Math.min(targetScrollLeft, parent.scrollWidth - parent.clientWidth)
		);

		parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
	}

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
			switch (type === 'back' ? currentSlide() - 1 : currentSlide() + 1) {
				case 1: {
					scrollParentToChild(projectsContainerRef, firstSlideRef);
					break;
				}
				case 2: {
					console.log('go to 2');
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
			class={css({
				display: 'flex',
				overflowX: 'scroll',
				gap: '5',
				paddingX: '[max(6.25vw,(100vw - 1680px)/2)]',
				scrollSnapType: '[x mandatory]',
				scrollbarWidth: '[none]'
			})}
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
				{#snippet projectImage()}
					<p class={css({ fontSize: '9xl' })}><IconCar /></p>
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
					A mobile application for buying and <strong>auctioning used vehicles</strong>. It features
					a listings feed, detailed vehicle profiles with <strong>media galleries</strong> and
					engine
					<strong>sound previews</strong>, a full purchase and bidding flow,
					<strong>push notifications</strong>,
					<strong>multilingual support</strong>
					with
					<strong>LTR/RTL</strong> layouts, and an integrated <strong>document viewer</strong>.
				{/snippet}
				{#snippet projectDisclaimer()}
					Product owned by Sylndr.
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
				{#snippet projectImage()}
					<p class={css({ fontSize: '9xl' })}><IconAuction /></p>
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
					A platform that connects nurses and healthcare staff with clinics and hospitals, enabling
					<strong>shift postings</strong>,
					<strong>scheduling management</strong>, geolocation, and
					<strong>digital signatures</strong>. I contributed to the development and refactoring of
					multiple modules across both the
					<strong>admin dashboard and the mobile application</strong>.
				{/snippet}
				{#snippet projectDisclaimer()}
					Product owned by connectRN Inc.
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
				{#snippet projectImage()}
					<p class={css({ fontSize: '9xl' })}><IconCare /></p>
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
					<strong>Matchmaking Healthcare App.</strong> A mobile and web application that connects
					nurses with older adults and their families to provide healthcare and caregiving services.
					I contributed by integrating the
					<strong>payment system</strong>, <strong>scheduling module</strong>,
					<strong>live map tracking</strong>, an administrative dashboard, and the mobile
					application.
				{/snippet}
				{#snippet projectDisclaimer()}
					Product owned by Prodigos S.A.S.
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
				{#snippet projectImage()}
					<p class={css({ fontSize: '9xl' })}><IconCaregiver /></p>
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
					A lightweight <strong>Rust system service</strong> for the Argon ONE V2 Raspberry Pi case.
					It handles <strong>fan speed</strong> with smooth,
					<strong>temperature-based curves</strong>
					and lets you customize the <strong>power button actions</strong> for shutdown or reboot.
					Built on <strong>systemd</strong> and configured with a simple YAML file, it runs fast, clean,
					and without extra dependencies. I built this project to gain practical experience with Rust.
				{/snippet}
				{#snippet projectDisclaimer()}
					Project developed independently, not affiliated with the company. Argon One is a
					registered trademark of Argon 40 Technologies.
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
				{#snippet projectImage()}
					<p class={css({ fontSize: '9xl' })}><IconRaspberry /></p>
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
					opacity: currentSlide() <= 1 ? '0.6' : '1',
					_hover: currentSlide() <= 1 ? {} : { bgColor: 'gray.200/70', cursor: 'pointer' },
					_active: currentSlide() <= 1 ? {} : { scale: '[0.95]', transition: 'all' }
				})}
				disabled={currentSlide() <= 1}
				onclick={() => onClickArrowButton('back')}
			>
				<IconArrowBackward class={css({ pl: '2' })} />
			</button>
			<button
				class={css({
					p: '3',
					fontSize: '2xl',
					rounded: 'full',
					bgColor: 'gray.200',
					color: 'gray.600',
					opacity: currentSlide() >= 5 ? '0.6' : '1',
					_hover: currentSlide() >= 5 ? {} : { bgColor: 'gray.200/70', cursor: 'pointer' },
					_active: currentSlide() >= 5 ? {} : { scale: '[0.95]', transition: 'all' }
				})}
				disabled={currentSlide() >= 5}
				onclick={() => onClickArrowButton('forward')}
			>
				<IconArrowBackward class={css({ pl: '2', transform: 'rotate(180deg)' })} />
			</button>
		</div>
	</div>
</section>
