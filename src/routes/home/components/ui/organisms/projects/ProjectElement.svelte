<script>
	/** @import {Snippet} from "svelte" */
	/**
	 * @typedef {object} ProjectElementProps
	 * @property {HTMLElement | null} projectsRef - Reference to the list item element.
	 * @property {Snippet} projectType - Snippet that renders the project type label (e.g., Web, App).
	 * @property {Snippet} projectName - Snippet that renders the name/title of the project.
	 * @property {Snippet} projectDescription - Snippet that renders the main description text of the
	 *   project.
	 * @property {Snippet} projectDisclaimer - Snippet that renders a short disclaimer or note beneath
	 *   the description.
	 * @property {Snippet} projectTechIcons - Snippet that renders a list/group of technology icons used
	 *   in the project.
	 * @property {number} projectIndex
	 * @property {HTMLElement | null} rootContainerRef
	 * @property {(projectIndex: number) => void} onVisible
	 * @property {(projectIndex: number) => void} onHide
	 */
	import { inView } from 'motion';

	/** @type {ProjectElementProps} */
	let {
		projectsRef = $bindable(),
		projectType,
		projectName,
		projectDescription,
		projectDisclaimer,
		projectTechIcons,
		projectIndex,
		rootContainerRef,
		onVisible,
		onHide
	} = $props();

	$effect(() => {
		const pr = projectsRef;
		const rcr = rootContainerRef;

		if (pr && rcr) {
			const stop = inView(
				pr,
				() => {
					onVisible(projectIndex);

					return () => {
						onHide(projectIndex);
					};
				},
				{ root: rcr, amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<li
	bind:this={projectsRef}
	class="w-[82vw] snap-center rounded-3xl bg-background p-8 shadow-sm md:w-xl md:p-20"
>
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
</li>
