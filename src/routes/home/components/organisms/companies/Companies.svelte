<script>
	import { sections } from '$lib/constans/index.js';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';

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
				{ amount: 0.5 }
			);

			return () => {
				stop();
			};
		}
	});

	const initialDescription = [
		'These companies have trusted my skills',
		'to develop custom software for their clients or corporate requirements.'
	];
</script>

{#snippet sponsorEntry(
	/** @type {string} */ href,
	/** @type {string} */ alt,
	/** @type {string} */ src
)}
	<div class={css({ _hover: { opacity: 0.8 } })}>
		<a {href} target="_blank" class={css({ p: '14' })}>
			<img {alt} {src} width="70" />
		</a>
	</div>
{/snippet}

<section
	id={sections.companies.id}
	class={css({
		bgColor: 'gray.50',
		py: '20',
		minH: '[100dvh]',
		display: 'flex',
		alignItems: 'center'
	})}
	bind:this={projectsContainerRef}
>
	<div
		class={css({
			flex: '1',
			mx: 'auto',
			maxW: '7xl',
			spaceY: '12',
			p: '12'
		})}
	>
		<div>
			<h3
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
				<span class={css({ display: { base: 'block', md: 'none' } })}>Collabs</span>
				<span class={css({ display: { base: 'none', md: 'block' } })}>Collaborations</span>
			</h3>
			<p
				class={css({
					textAlign: 'center',
					fontSize: 'xl',
					fontFamily: 'raleway',
					fontWeight: 'semibold',
					color: 'gray.500'
				})}
			>
				{initialDescription[0]}<br />{initialDescription[1]}
			</p>
		</div>
		<div
			class={css({
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '14'
			})}
		>
			{@render sponsorEntry('https://www.connectrn.com', 'connectrn-logo', '/icons/crn-icon.svg')}
			{@render sponsorEntry(
				'https://www.venturit.com',
				'venturit-logo',
				'/icons/venturit-icon.svg'
			)}
			{@render sponsorEntry(
				'https://www.leangroup.com/solutions-and-services/technology',
				'lean-logo',
				'/icons/lean-icon.svg'
			)}
			{@render sponsorEntry('https://ottomoto.net', 'ottomoto-logo', '/icons/ottomoto-icon.svg')}
		</div>
	</div>
</section>
