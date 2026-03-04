<script>
	/** @import {Snippet} from "svelte" */
	/**
	 * @typedef {object} ProjectElementProps
	 * @property {Snippet} projectType - Snippet that renders the project type label (e.g., Web, App).
	 * @property {Snippet} projectName - Snippet that renders the name/title of the project.
	 * @property {Snippet} projectDescription - Snippet that renders the main description text of the
	 *   project.
	 * @property {Snippet} projectDisclaimer - Snippet that renders a short disclaimer or note beneath
	 *   the description.
	 * @property {Snippet} projectTechIcons - Snippet that renders a list/group of technology icons
	 *   used in the project.
	 */

	/** @type {ProjectElementProps} */
	let { projectType, projectName, projectDescription, projectDisclaimer, projectTechIcons } =
		$props();
</script>

<div>
	<div class="flex h-full flex-col justify-between gap-6">
		<div>
			<h3 class="font-raleway text-3xl font-bold">
				{@render projectName()}
			</h3>
			<h4 class="font-raleway text-base font-medium text-gray-500">
				{@render projectType()}
			</h4>
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
</div>
