<script>
	/** @import { Snippet } from 'svelte' */

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
			<h5 class="font-raleway text-base font-medium text-gray-500">
				{@render projectType()}
			</h5>
			<h5 class="font-raleway text-3xl font-bold">
				{@render projectName()}
			</h5>
		</div>

		<div class="space-y-3">
			<p class="font-raleway text-lg font-normal">
				{@render projectDescription()}
			</p>
			<p class="text-sm text-gray-500">
				{@render projectDisclaimer()}
			</p>
		</div>

		<div class="space-y-3">
			{@render projectTechIcons()}
		</div>
	</div>
</li>
