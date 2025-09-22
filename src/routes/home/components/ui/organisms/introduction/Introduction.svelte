<script>
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { inView } from 'motion';

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
	<span class="text-black">{text}</span>
{/snippet}

<section
	id={sections.aboutMe.id}
	class="flex min-h-dvh items-center justify-center bg-gray-50 py-20"
>
	<div class="max-w-7xl">
		<h4
			bind:this={introductionParagraphRef}
			class="px-8 text-center font-raleway text-2xl leading-11 font-bold text-gray-500 max-md:px-5 sm:text-3xl"
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
