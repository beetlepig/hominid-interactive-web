<script>
	import { css } from 'styled-system/css';
</script>

{#snippet sponsorEntry(
	/** @type {string} */ href,
	/** @type {string} */ alt,
	/** @type {string} */ src
)}
	<div
		class={css({
			bgColor: 'gray.50',
			p: '10',
			borderRadius: '4xl',
			display: 'flex',
			alignItems: 'center'
		})}
	>
		<a {href} target="_blank">
			<img {alt} {src} width="50" />
		</a>
	</div>
{/snippet}

<section>
	<div class={css({ mx: 'auto', maxW: '7xl', py: '24', px: '12', spaceY: '12' })}>
		<h3
			class={css({
				textAlign: 'center',
				fontSize: '2xl',
				fontFamily: 'raleway',
				fontWeight: 'extrabold',
				sm: {
					fontSize: '4xl'
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
