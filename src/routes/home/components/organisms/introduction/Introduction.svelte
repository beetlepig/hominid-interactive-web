<script>
	import { sections } from '$lib/constans/index.js';
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
				{ amount: 'some' }
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
		py: '28',
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
			I am a {@render blackSpan('frontend developer')} with over
			{@render blackSpan('5 years of experience')}
			collaborating with companies to bring their products to market. I have led and been part of both
			large and small teams, from startups to established companies. My focus is on
			{@render blackSpan('efficiency and maintainability')}
			in development, with a strong emphasis on the
			{@render blackSpan('end-user')}
			and their experience as a {@render blackSpan('top priority')}.
		</h4>
	</div>
</section>
