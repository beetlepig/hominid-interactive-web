<script>
	/** @import { Snippet } from 'svelte' */
	import { sections } from '$lib/constans';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';
	import IconStyledComponents from '~icons/bxl/css3';
	import IconFirebase from '~icons/bxl/firebase';
	import IconGoogle from '~icons/bxl/google';
	import IconReact from '~icons/bxl/react';
	import IconRedux from '~icons/bxl/redux';
	import IconTailwind from '~icons/bxl/tailwind-css';
	import IconCaregiver from '~icons/carbon/airline-passenger-care';
	import IconJest from '~icons/devicon-plain/jest';
	import IconPlaywright from '~icons/devicon-plain/playwright';
	import IconZustand from '~icons/devicon-plain/zustand';
	import IconCar from '~icons/material-symbols/car-tag-outline';
	import IconAntd from '~icons/simple-icons/antdesign';
	import IconTanStackQuery from '~icons/simple-icons/reactquery';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	$effect(() => {
		if (projectsContainerRef) {
			const stop = inView(
				projectsContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.7 }
			);

			return () => {
				stop();
			};
		}
	});
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

{#snippet projectCard(
	/** @type {Snippet} */ projectType,
	/** @type {Snippet} */ projectName,
	/** @type {Snippet} */ projectDescription,
	/** @type {Snippet} */ projectDisclaimer,
	/** @type {Snippet} */ projectTechIcons,
	/** @type {Snippet} */ projectImage
)}
	<li
		class={css({
			display: 'flex',
			scrollSnapAlign: 'center',
			padding: '10',
			flex: '[0 0 min(calc(max(87.5vw,280px) - 30px),1680px)]',
			flexDir: 'column',
			gap: '10',
			rounded: '3xl',
			bgColor: 'white',
			sm: { flex: '[0 0 min(calc(max(87.5vw,280px) - 20px),1680px)]' },
			md: { p: '20', flexDir: 'row', flex: '[0 0 min(calc(max(87.5vw,280px)),1680px)]' }
		})}
	>
		<div class={css({ flex: '1', spaceY: '5' })}>
			<div>
				<h5
					class={css({
						fontFamily: 'raleway',
						fontSize: 'md',
						fontWeight: 'medium',
						color: 'gray.500'
					})}
				>
					{@render projectType()}
				</h5>
				<h5 class={css({ fontFamily: 'raleway', fontSize: '3xl', fontWeight: 'bold' })}>
					{@render projectName()}
				</h5>
			</div>

			<div class={css({ spaceY: '3' })}>
				<p class={css({ fontFamily: 'raleway', fontSize: 'lg', fontWeight: 'normal' })}>
					{@render projectDescription()}
				</p>
				<p class={css({ fontSize: 'sm', color: 'gray.500' })}>
					{@render projectDisclaimer()}
				</p>
			</div>

			<div class={css({ spaceY: '4' })}>
				{@render projectTechIcons()}
			</div>
		</div>

		<div
			class={css({
				flex: '1',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			})}
		>
			{@render projectImage()}
		</div>
	</li>
{/snippet}

<section
	id={sections.projects.id}
	class={css({
		bgColor: 'gray.50',
		py: '20',
		minH: '[100dvh]'
	})}
	bind:this={projectsContainerRef}
>
	<div class={css({ height: 'full', spaceY: '20' })}>
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
			Projects
		</h2>
		<ul
			class={css({
				margin: '0',
				display: 'flex',
				flex: '1',
				overflowX: 'scroll',
				gap: '5',
				minH: 'xl',
				h: 'full',
				paddingX: '[max(6.25vw,(100vw - 1680px)/2)]',
				scrollSnapType: '[x mandatory]',
				scrollbarWidth: '[none]',
				boxSizing: 'content-box'
			})}
		>
			{#snippet ottomotoProjectType()}
				Web Application
			{/snippet}
			{#snippet ottomotoProjectName()}
				Ottomoto
			{/snippet}
			{#snippet ottomotoProjectDescription()}
				Web application for <strong>credit applications</strong> designed for dealers, lenders, and
				individuals to streamline the loan and lease process in vehicle acquisition. I contributed
				by integrating and maintaining providers for
				<strong>credit reports</strong>, vehicle valuation, identity verification,
				<strong>insurance, and warranties</strong>; developing a
				<strong>payments module</strong>; creating
				<strong>end-to-end (E2E) tests</strong>; refactoring and maintaining several modules; and
				improving the overall <strong>system architecture</strong>.
			{/snippet}
			{#snippet ottomotoProjectDisclaimer()}
				Product owned by OttoMoto®
			{/snippet}
			{#snippet ottomotoProjectTechIcons()}
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
			{#snippet ottomotoProjectImage()}
				<p class={css({ fontSize: '9xl' })}><IconCar /></p>
			{/snippet}
			{@render projectCard(
				ottomotoProjectType,
				ottomotoProjectName,
				ottomotoProjectDescription,
				ottomotoProjectDisclaimer,
				ottomotoProjectTechIcons,
				ottomotoProjectImage
			)}

			{#snippet prodigosProjectType()}
				Mobile and Web Application
			{/snippet}
			{#snippet prodigosProjectName()}
				Pródigos App
			{/snippet}
			{#snippet prodigosProjectDescription()}
				<strong>Matchmaking Healthcare App.</strong> A mobile and web application that connects
				nurses with older adults and their families to provide healthcare and caregiving services. I
				contributed by integrating the
				<strong>payment system</strong>, <strong>scheduling module</strong>,
				<strong>live map tracking</strong>, an administrative dashboard, and the mobile application.
			{/snippet}
			{#snippet prodigosProjectDisclaimer()}
				Product owned by Prodigos S.A.S.
			{/snippet}
			{#snippet prodigosProjectTechIcons()}
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
			{#snippet prodigosProjectImage()}
				<p class={css({ fontSize: '9xl' })}><IconCaregiver /></p>
			{/snippet}
			{@render projectCard(
				prodigosProjectType,
				prodigosProjectName,
				prodigosProjectDescription,
				prodigosProjectDisclaimer,
				prodigosProjectTechIcons,
				prodigosProjectImage
			)}
		</ul>
	</div>
</section>
