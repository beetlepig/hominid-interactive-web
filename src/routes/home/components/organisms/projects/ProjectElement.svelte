<script>
	/** @import { Snippet } from 'svelte' */
	import { css } from 'styled-system/css';

	/**
	 * @typedef {object} ProjectElementProps
	 * @property {HTMLElement | null} [ref]
	 * @property {Snippet} projectType
	 * @property {Snippet} projectName
	 * @property {Snippet} projectDescription
	 * @property {Snippet} projectDisclaimer
	 * @property {Snippet} projectTechIcons
	 */

	/** @type {ProjectElementProps} */
	let {
		ref = $bindable(),
		projectType,
		projectName,
		projectDescription,
		projectDisclaimer,
		projectTechIcons
	} = $props();
</script>

<li
	bind:this={ref}
	class="w-[82vw] snap-center rounded-3xl bg-background p-8 shadow-sm md:w-xl md:p-20"
>
	<div class="flex h-full flex-col justify-between gap-6">
		<div>
			<h5
				class={css({
					fontFamily: 'raleway',
					fontSize: 'md',
					fontWeight: 'medium',
					color: 'gray.500'
				})}
			>
				{@render projectType()}
			</h5>
			<h5 class={css({ fontFamily: 'raleway', fontSize: '3xl', fontWeight: 'bold' })}>
				{@render projectName()}
			</h5>
		</div>

		<div class={css({ spaceY: '3' })}>
			<p class={css({ fontFamily: 'raleway', fontSize: 'lg', fontWeight: 'normal' })}>
				{@render projectDescription()}
			</p>
			<p class={css({ fontSize: 'sm', color: 'gray.500' })}>
				{@render projectDisclaimer()}
			</p>
		</div>

		<div class={css({ spaceY: '4' })}>
			{@render projectTechIcons()}
		</div>
	</div>
</li>
