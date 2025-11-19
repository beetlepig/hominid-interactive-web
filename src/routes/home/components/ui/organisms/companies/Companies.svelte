<script>
	/** @import {Snippet} from "svelte" */
	import {
		HoverCard,
		HoverCardTrigger,
		HoverCardContent
	} from '$components/ui/molecules/hover-card';
	import { m } from '$lib/paraglide/messages.js';

	/** @type {{ contact: Snippet }} */
	let { contact } = $props();

	const initialDescription = [
		m.collaborations_description_one(),
		m.collaborations_description_two()
	];
</script>

{#snippet sponsorEntry(/** @type {string} */ alt, /** @type {string} */ src)}
	<div class="hover:opacity-80">
		<img {alt} {src} width="70" height="70" />
	</div>
{/snippet}

<section class="flex min-h-dvh justify-center bg-gray-50 pt-20 md:py-10">
	<div class="flex flex-col justify-center gap-14">
		<div class="flex flex-1 flex-col justify-center space-y-12 px-6">
			<div class="space-y-4">
				<h3 class="text-center font-raleway text-6xl font-black md:text-8xl">
					<span class="md:hidden">{m.collaborations_title_short()}</span>
					<span class="hidden md:block">{m.collaborations_title()}</span>
				</h3>
				<p class="text-center font-raleway text-xl font-semibold text-gray-500">
					{initialDescription[0]}<br />{initialDescription[1]}
				</p>
			</div>
			<div class="flex flex-wrap items-center justify-center gap-14">
				<HoverCard>
					<HoverCardTrigger
						href="https://www.leangroup.com/solutions-and-services/technology"
						target="_blank"
						rel="noreferrer noopener"
					>
						{@render sponsorEntry('lean-logo', '/icons/lean-icon.svg')}
					</HoverCardTrigger>
					<HoverCardContent>
						<p class="font-raleway text-lg font-bold">Lean Tech</p>
						<p class="font-raleway text-base text-foreground">
							A company that provides nearshore and offshore software development staffing to help
							businesses build efficient teams with bilingual talent from Latin America.
						</p>
					</HoverCardContent>
				</HoverCard>

				<HoverCard>
					<HoverCardTrigger href="https://ottomoto.net" target="_blank" rel="noreferrer noopener">
						{@render sponsorEntry('ottomoto-logo', '/icons/ottomoto-icon.svg')}
					</HoverCardTrigger>
					<HoverCardContent>
						<p class="font-raleway text-lg font-bold">Ottomoto</p>
						<p class="font-raleway text-base text-foreground">
							A platform that helps car, RV, boat, and aircraft dealers make financing easier by
							connecting sellers, lenders, and buyers in one place.
						</p>
					</HoverCardContent>
				</HoverCard>

				<HoverCard>
					<HoverCardTrigger
						href="https://www.venturit.com"
						target="_blank"
						rel="noreferrer noopener"
					>
						{@render sponsorEntry('venturit-logo', '/icons/venturit-icon.svg')}
					</HoverCardTrigger>
					<HoverCardContent>
						<p class="font-raleway text-lg font-bold">Venturit</p>
						<p class="font-raleway text-base text-foreground">
							A software company serving healthcare, finance, and education that drives innovation
							with AI, blockchain, IoT, and full-stack solutions.
						</p>
					</HoverCardContent>
				</HoverCard>

				<HoverCard>
					<HoverCardTrigger
						href="https://www.connectrn.com"
						target="_blank"
						rel="noreferrer noopener"
					>
						{@render sponsorEntry('connectrn-logo', '/icons/crn-icon.svg')}
					</HoverCardTrigger>
					<HoverCardContent>
						<p class="font-raleway text-lg font-bold">Connectrn</p>
						<p class="font-raleway text-base text-foreground">
							A company in the healthcare industry that provides technology solutions for managing
							health staff and nurses.
						</p>
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
		{@render contact()}
	</div>
</section>
