<script>
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let introductionParagraphRef = $state(null);

	$effect(() => {
		if (introductionParagraphRef) {
			const stop = inView(
				introductionParagraphRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});
</script>

{#snippet blackSpan(/** @type {string} */ text)}
	<span class={css({ color: 'black' })}>{text}</span>
{/snippet}

<section
	id={sections.aboutMe.id}
	class={css({
		minHeight: 'screen',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minH: '[100dvh]',
		py: '20',
		bgColor: 'gray.50'
	})}
>
	<div class={css({ maxW: '7xl', spaceY: '28' })}>
		<h4
			bind:this={introductionParagraphRef}
			class={css({
				textAlign: 'center',
				fontFamily: 'raleway',
				fontSize: '2xl',
				px: '8',
				fontWeight: 'bold',
				color: 'gray.500',
				sm: {
					fontSize: '3xl'
				},
				mdDown: { px: '5' }
			})}
		>
			{m.introduction_im()}
			{@render blackSpan(m.introduction_fe())}
			{m.introduction_over()}
			{@render blackSpan(m.introduction_experience())}
			{m.introduction_collaborating()}
			{@render blackSpan(m.introduction_efficiency())}
			{m.introduction_emphasis()}
			{@render blackSpan(m.introduction_end_user())}
			{m.introduction_their_experience()}
			{@render blackSpan(m.introduction_top_priority())}.
		</h4>
	</div>
</section>
