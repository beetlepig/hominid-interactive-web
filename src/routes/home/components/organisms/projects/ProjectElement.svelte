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
	 * @property {Snippet} projectImage
	 */

	/** @type {ProjectElementProps} */
	let {
		ref = $bindable(),
		projectType,
		projectName,
		projectDescription,
		projectDisclaimer,
		projectTechIcons,
		projectImage
	} = $props();
</script>

<li
	bind:this={ref}
	class={css({
		display: 'flex',
		scrollSnapAlign: 'center',
		padding: '8',
		flex: '[0 0 min(calc(max(87.5vw,280px) - 20px),1680px)]',
		flexDir: 'column',
		gap: '10',
		rounded: '3xl',
		bgColor: 'white',
		md: { p: '20', flexDir: 'row', flex: '[0 0 min(calc(max(87.5vw,280px)),1680px)]' }
	})}
>
	<div class={css({ flex: '1', spaceY: '5' })}>
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

		<div
			class={css({
				flex: '1',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				md: { display: 'none' }
			})}
		>
			{@render projectImage()}
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

	<div
		class={css({
			flex: '1',
			display: 'none',
			justifyContent: 'center',
			alignItems: 'center',
			md: { display: 'flex' }
		})}
	>
		{@render projectImage()}
	</div>
</li>
