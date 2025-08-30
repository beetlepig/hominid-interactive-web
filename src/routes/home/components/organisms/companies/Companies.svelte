<script>
	import { css } from 'styled-system/css';
	import { createSignal } from '$lib';
	import { fade } from 'svelte/transition';
	import { sections } from '$lib/constans/index.js';
	import { inView } from 'motion';

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

	const [companyDescription, setCompanyDescription] = createSignal(initialDescription);
</script>

{#snippet sponsorEntry(
	/** @type {string} */ href,
	/** @type {string} */ alt,
	/** @type {string} */ src,
	/** @type {() => void} */ onEnter
)}
	<div
		class={css({
			borderRadius: 'xl',
			display: 'flex',
			alignItems: 'center'
		})}
	>
		<a
			{href}
			target="_blank"
			onmouseenter={() => onEnter()}
			class={css({ _hover: { opacity: 0.8 }, p: '14' })}
			onmouseleave={() => setCompanyDescription(initialDescription)}
		>
			<img {alt} {src} width="70" />
		</a>
	</div>
{/snippet}

<section
	id={sections.companies.id}
	class={css({ bgColor: 'gray.50', height: '[100dvh]', display: 'flex', alignItems: 'center' })}
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
		<h3
			class={css({
				textAlign: 'center',
				fontSize: '4xl',
				fontFamily: 'raleway',
				fontWeight: 'extrabold',
				sm: {
					fontSize: '5xl'
				}
			})}
		>
			I have collaborated with
		</h3>
		<div
			class={css({
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap'
			})}
		>
			{@render sponsorEntry(
				'https://www.connectrn.com',
				'connectrn-logo',
				'/icons/crn-icon.svg',
				() => {
					setCompanyDescription([
						'A company in the healthcare industry',
						'that provides technology solutions for managing health staff and nurses.'
					]);
				}
			)}
			{@render sponsorEntry(
				'https://www.venturit.com',
				'venturit-logo',
				'/icons/venturit-icon.svg',
				() => {
					setCompanyDescription([
						'A software company serving healthcare, finance, and education',
						'that drives innovation with AI, blockchain, IoT, and full-stack solutions.'
					]);
				}
			)}
			{@render sponsorEntry(
				'https://www.leangroup.com/solutions-and-services/technology',
				'lean-logo',
				'/icons/lean-icon.svg',
				() => {
					setCompanyDescription([
						'A company that provides nearshore and offshore software development staffing',
						'to help businesses build efficient teams with bilingual talent from Latin America.'
					]);
				}
			)}
			{@render sponsorEntry(
				'https://ottomoto.net',
				'ottomoto-logo',
				'/icons/ottomoto-icon.svg',
				() => {
					setCompanyDescription([
						'A platform that helps car, RV, boat, and aircraft dealers',
						'make financing easier by connecting sellers, lenders, and buyers in one place.'
					]);
				}
			)}
		</div>
		<div>
			{#key companyDescription()[0]}
				<p
					class={css({
						textAlign: 'center',
						fontSize: 'xl',
						fontFamily: 'raleway',
						fontWeight: 'semibold'
					})}
					in:fade
				>
					{companyDescription()[0]}<br />{companyDescription()[1]}
				</p>
			{/key}
		</div>
	</div>
</section>
