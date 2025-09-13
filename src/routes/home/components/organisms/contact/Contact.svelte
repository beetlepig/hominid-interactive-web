<script>
	import { createSignal } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { Dialog, Separator } from 'bits-ui';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';
	import IconArrow from '~icons/material-symbols/arrow-forward-ios';
	import IconClose from '~icons/mdi/window-close';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let contactContainerRef = $state(null);

	const [dialogVisible, setDialogVisible] = createSignal(false);

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
	class={css({ alignSelf: 'stretch', marginTop: 'auto', md: { alignSelf: 'center' } })}
>
	<Button
		variant="default"
		size="xl"
		class="w-full font-raleway text-base font-semibold max-md:rounded-none"
		onclick={() => {
			setDialogVisible(true);
		}}
	>
		{m.contact_button()}
		<IconArrow />
	</Button>
	<Dialog.Root bind:open={dialogVisible, setDialogVisible}>
		<Dialog.Portal>
			<Dialog.Overlay
				class={css({
					position: 'fixed',
					inset: '0',
					zIndex: '50',
					bg: 'black/80'
				})}
			/>
			<Dialog.Content
				class={css({
					position: 'fixed',
					left: '[50%]',
					top: '[50%]',
					zIndex: '50',

					w: 'full',
					maxW: '[calc(100% - 2rem)]',
					md: { w: 'full' },
					sm: { maxW: '[490px]' },

					transform: 'translate(-50%, -50%)',
					rounded: 'lg',
					bgColor: 'white',
					shadow: 'sm',
					borderWidth: '1px',
					p: '5',
					outline: 'none'
				})}
			>
				<Dialog.Title
					class={css({
						display: 'flex',
						w: 'full',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 'lg',
						fontFamily: 'raleway',
						fontWeight: 'semibold',
						letterSpacing: 'tight'
					})}
				>
					{m.contact_modal_header()}
				</Dialog.Title>
				<Separator.Root
					class={css({
						bgColor: 'gray.200',
						display: 'block',
						h: '[1px]',
						mx: '-5',
						mt: '5',
						mb: '6'
					})}
				/>
				<Dialog.Description
					class={css({
						color: 'gray.500',
						fontSize: 'md'
					})}
				>
					{m.contact_modal_description()}
				</Dialog.Description>
				<div
					class={css({
						display: 'flex',
						flexDir: 'column',
						my: '6',
						spaceY: '4'
					})}
				>
					<a
						href="https://www.linkedin.com/in/karlosvallejo/"
						target="_blank"
						rel="noopener noreferrer"
						class={css({ fontWeight: 'medium' })}
					>
						LinkedIn
					</a>
					<a
						href="https://github.com/beetlepig"
						target="_blank"
						rel="noopener noreferrer"
						class={css({ fontWeight: 'medium' })}
					>
						GitHub
					</a>
					<a href="mailto:devpig@icloud.com" class={css({ fontWeight: 'medium' })}>Email</a>
					<a
						href="/assets/Carlos_Gomez_CV.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class={css({ fontWeight: 'medium' })}
					>
						{m.contact_modal_cv()}
					</a>
				</div>

				<Dialog.Close
					class={css({
						position: 'absolute',
						top: '5',
						right: '5',
						rounded: 'md'
					})}
				>
					<div class={css({ fontSize: 'xl' })}>
						<IconClose />
						<span class={css({ srOnly: true })}>{m.contact_modal_close()}</span>
					</div>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>
