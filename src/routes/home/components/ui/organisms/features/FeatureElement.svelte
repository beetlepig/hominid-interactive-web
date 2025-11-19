<script>
	/** @import {Snippet} from "svelte" */

	/**
	 * @typedef {object} FeatureElementProps
	 * @property {Snippet} canvasElement - Snippet that renders the feature's canvas/visual element.
	 * @property {string} title - The heading text displayed for the feature.
	 * @property {Snippet} content - Snippet that renders the descriptive text for the feature.
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
