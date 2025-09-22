<script>
	import { Button } from '$components/ui/atoms/button/index.js';
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription
	} from '$components/ui/organisms/dialog/index.js';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { inView } from 'motion';
	import IconArrow from '~icons/material-symbols/arrow-forward-ios';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let contactContainerRef = $state(null);

	let dialogVisible = $state(false);

	$effect(() => {
		if (contactContainerRef) {
			const stop = inView(
				contactContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.5 }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<div
	bind:this={contactContainerRef}
	id={sections.contact.id}
	class="mt-auto self-stretch md:self-center"
>
	<Button
		variant="default"
		size="xl"
		class="w-full font-raleway text-base font-semibold max-md:rounded-none"
		onclick={() => {
			dialogVisible = true;
		}}
	>
		{m.contact_button()}
		<IconArrow />
	</Button>
	<Dialog bind:open={dialogVisible}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle class="font-raleway">
					{m.contact_modal_header()}
				</DialogTitle>
				<DialogDescription class="font-raleway text-base text-gray-500">
					{m.contact_modal_description()}
				</DialogDescription>
			</DialogHeader>

			<div class="my-2 flex flex-col space-y-4">
				<a
					href="https://www.linkedin.com/in/karlosvallejo/"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium"
				>
					LinkedIn
				</a>
				<a
					href="https://github.com/beetlepig"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium"
				>
					GitHub
				</a>
				<a href="mailto:devpig@icloud.com" class="font-medium">Email</a>
				<a
					href={getLocale() === 'es'
						? '/assets/Carlos_Gomez_CV_v2_1_es.pdf'
						: '/assets/Carlos_Gomez_CV_v2_1_en.pdf'}
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium"
				>
					{m.contact_modal_cv()}
				</a>
			</div>
		</DialogContent>
	</Dialog>
</div>
