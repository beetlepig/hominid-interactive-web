<script>
	/** @import { Snippet } from 'svelte' */
	import { css } from 'styled-system/css';

	/** @type {{ contact: Snippet }} */
	let { contact } = $props();

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
		<a {href} target="_blank">
			<img {alt} {src} width="70" />
		</a>
	</div>
{/snippet}

<section
	class={css({
		display: 'flex',
		justifyContent: 'center',
		bgColor: 'gray.50',
		pt: '20',
		md: { py: '10' },
		minH: '[100dvh]'
	})}
>
	<div
		class={css({
			display: 'flex',
			flexDir: 'column',
			gap: '14',
			justifyContent: 'center'
		})}
	>
		<div
			class={css({
				flex: '1',
				display: 'flex',
				flexDir: 'column',
				justifyContent: 'center',
				px: '6',
				spaceY: '12'
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
		{@render contact()}
	</div>
</section>
