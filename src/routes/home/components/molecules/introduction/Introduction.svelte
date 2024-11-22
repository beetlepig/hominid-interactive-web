<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans/index.js';
	import { inView } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let introductionContainerRef = $state(null);

	$effect(() => {
		if (introductionContainerRef) {
			const stop = inView(
				introductionContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.9 }
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
	bind:this={introductionContainerRef}
>
	<div class={css({ maxW: '5xl', bgColor: 'white', py: '28', rounded: 'xl', m: '9' })}>
		<h4
			class={css({
				textAlign: 'center',
				fontFamily: 'raleway',
				fontSize: 'lg',
				px: '8',
				fontWeight: 'bold',
				color: 'gray.500',
				sm: {
					fontSize: 'xl'
				}
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
		<h3
			class={css({
				my: '10',
				textAlign: 'center',
				fontSize: 'xl',
				fontFamily: 'raleway',
				fontWeight: 'bold',
				sm: {
					fontSize: '2xl'
				}
			})}
		>
			Some companies I have collaborated with
		</h3>
		<div class={css({ display: 'flex', justifyContent: 'center', spaceX: '5' })}>
			<a href="https://www.connectrn.com" target="_blank" class={css({ display: 'inline-flex' })}>
				<img alt="connectrn-logo" src="/icons/crn-icon.svg" width="50" />
			</a>
			<a href="https://www.venturit.com" target="_blank">
				<img alt="venturit-logo" src="/icons/venturit-icon.svg" width="50" />
			</a>
			<a
				href="https://www.leangroup.com/solutions-and-services/technology"
				target="_blank"
				class={css({ display: 'inline-flex' })}
			>
				<img alt="lean-logo" src="/icons/lean-icon.svg" width="50" />
			</a>
			<a href="https://ottomoto.net" target="_blank" class={css({ display: 'inline-flex' })}>
				<img alt="ottomoto-logo" src="/icons/ottomoto-icon.svg" width="50" />
			</a>
		</div>
	</div>
</section>
