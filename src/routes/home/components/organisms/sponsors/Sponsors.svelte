<script>
	import { css } from 'styled-system/css';
	import { createSignal } from '$lib';

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
	/** @type {(alt: string) => void} */ onEnter
)}
	<div
		class={css({
			p: '10',
			borderRadius: 'xl',
			display: 'flex',
			alignItems: 'center'
		})}
	>
		<a
			{href}
			target="_blank"
			onmouseenter={() => onEnter(alt)}
			onmouseleave={() => setCompanyDescription(initialDescription)}
		>
			<img {alt} {src} width="70" />
		</a>
	</div>
{/snippet}

<section
	class={css({ bgColor: 'gray.50', height: '[100dvh]', display: 'flex', alignItems: 'center' })}
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
				flexWrap: 'wrap',
				gap: '4'
			})}
		>
			{@render sponsorEntry(
				'https://www.connectrn.com',
				'connectrn-logo',
				'/icons/crn-icon.svg',
				(alt) => {
					setCompanyDescription([alt, alt]);
				}
			)}
			{@render sponsorEntry(
				'https://www.venturit.com',
				'venturit-logo',
				'/icons/venturit-icon.svg',
				(alt) => {
					setCompanyDescription([alt, alt]);
				}
			)}
			{@render sponsorEntry(
				'https://www.leangroup.com/solutions-and-services/technology',
				'lean-logo',
				'/icons/lean-icon.svg',
				(alt) => {
					setCompanyDescription([alt, alt]);
				}
			)}
			{@render sponsorEntry(
				'https://ottomoto.net',
				'ottomoto-logo',
				'/icons/ottomoto-icon.svg',
				(alt) => {
					setCompanyDescription([alt, alt]);
				}
			)}
		</div>
		<div>
			<p
				class={css({
					textAlign: 'center',
					fontSize: 'xl',
					fontFamily: 'raleway',
					fontWeight: 'semibold'
				})}
			>
				{companyDescription()[0]}<br />{companyDescription()[1]}
			</p>
		</div>
	</div>
</section>
