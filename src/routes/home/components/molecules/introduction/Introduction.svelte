<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { sections } from '$lib/constans/index.js';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

{#snippet blackSpan(/** @type {string} */ text)}
	<span class={css({ color: 'black' })}>{text}</span>
{/snippet}

<section
	id={sections.aboutMe.id}
	class={css({
		py: '28',
		my: '12',
		bgColor: 'white/50',
		backdropFilter: 'auto',
		backdropBlur: 'xl'
	})}
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [1] }}
>
	<div class={css({ mx: 'auto', maxW: '5xl' })}>
		<h3
			class={css({
				textAlign: 'center',
				fontSize: '3xl',
				fontFamily: 'raleway',
				fontWeight: 'bold'
			})}
		>
			Some companies I have collaborated with
		</h3>
		<div class={css({ my: '10', display: 'flex', justifyContent: 'center', spaceX: '4' })}>
			<a href="https://www.connectrn.com" target="_blank">
				<img alt="connectrn-logo" src="/icons/crn-icon.svg" width="50" />
			</a>
			<a href="https://www.venturit.com" target="_blank">
				<img alt="venturit-logo" src="/icons/venturit-icon.svg" width="50" />
			</a>
		</div>
		<h4
			class={css({
				textAlign: 'center',
				fontFamily: 'raleway',
				fontSize: 'xl',
				fontWeight: 'bold',
				color: 'gray.500'
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
