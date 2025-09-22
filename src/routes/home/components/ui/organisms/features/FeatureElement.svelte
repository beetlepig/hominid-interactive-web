<script>
	/** @import { Snippet } from 'svelte' */

	/**
	 * @typedef {object} FeatureElementProps
	 * @property {Snippet} canvasElement
	 * @property {string} title
	 * @property {Snippet} content
	 */

	/** @type {FeatureElementProps} */
	const { canvasElement, title, content } = $props();
</script>

<div class="flex h-dvh flex-col justify-center space-y-3 max-lg:h-auto">
	<div class="h-96 lg:hidden">
		{@render canvasElement()}
	</div>
	<h3 class="font-raleway text-3xl font-bold">
		{title}
	</h3>
	<p class="font-raleway text-xl font-semibold text-gray-500">
		{@render content()}
	</p>
</div>
