<script>
	import { sections } from '$lib/constans/index.js';
	import { Dialog, Separator } from 'bits-ui';
	import { inView } from 'motion';
	import { css } from 'styled-system/css';
	import IconArrow from '~icons/material-symbols/arrow-forward-ios';
	import IconClose from '~icons/mdi/window-close';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	$effect(() => {
		if (projectsContainerRef) {
			const stop = inView(
				projectsContainerRef,
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

	const initialDescription = [
		'These companies have trusted my skills',
		'to develop custom software for their clients or corporate requirements.'
	];
</script>

{#snippet sponsorEntry(
	/** @type {string} */ href,
	/** @type {string} */ alt,
	/** @type {string} */ src
)}
	<div class={css({ _hover: { opacity: 0.8 } })}>
		<a {href} target="_blank" class={css({ p: '14' })}>
			<img {alt} {src} width="70" />
		</a>
	</div>
{/snippet}

<section
	id={sections.companies.id}
	class={css({
		bgColor: 'gray.50',
		py: '20',
		minH: '[100dvh]',
		display: 'flex',
		alignItems: 'center'
	})}
	bind:this={projectsContainerRef}
>
	<div
		class={css({
			flex: '1',
			mx: 'auto',
			maxW: '7xl',
			spaceY: '12',
			p: '12'
		})}
	>
		<div>
			<h3
				class={css({
					textAlign: 'center',
					fontFamily: 'raleway',
					fontWeight: 'black',
					fontSize: '6xl',
					md: {
						fontSize: '8xl'
					}
				})}
			>
				<span class={css({ display: { base: 'block', md: 'none' } })}>Collabs</span>
				<span class={css({ display: { base: 'none', md: 'block' } })}>Collaborations</span>
			</h3>
			<p
				class={css({
					textAlign: 'center',
					fontSize: 'xl',
					fontFamily: 'raleway',
					fontWeight: 'semibold',
					color: 'gray.500'
				})}
			>
				{initialDescription[0]}<br />{initialDescription[1]}
			</p>
		</div>
		<div
			class={css({
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '14'
			})}
		>
			{@render sponsorEntry('https://www.connectrn.com', 'connectrn-logo', '/icons/crn-icon.svg')}
			{@render sponsorEntry(
				'https://www.venturit.com',
				'venturit-logo',
				'/icons/venturit-icon.svg'
			)}
			{@render sponsorEntry(
				'https://www.leangroup.com/solutions-and-services/technology',
				'lean-logo',
				'/icons/lean-icon.svg'
			)}
			{@render sponsorEntry('https://ottomoto.net', 'ottomoto-logo', '/icons/ottomoto-icon.svg')}
		</div>
		<div class={css({ display: 'flex', justifyContent: 'center', alignSelf: 'end' })}>
			<Dialog.Root>
				<Dialog.Trigger
					class={css({
						display: 'inline-flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '2',
						bgColor: 'zinc.800',
						color: 'white',
						shadow: 'sm',
						fontFamily: 'raleway',
						fontWeight: 'semibold',
						px: '5',
						py: '3',
						rounded: '3xl',
						_hover: { bgColor: 'zinc.800/90' },
						_active: { scale: '[0.95]', transition: 'all' }
					})}
				>
					Contact <IconArrow />
				</Dialog.Trigger>
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
							Contact Links
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
							You can explore more of my work or reach out to me through the following channels.
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
								class={css({ fontWeight: 'medium' })}
							>
								LinkedIn
							</a>
							<a
								href="https://github.com/beetlepig"
								target="_blank"
								class={css({ fontWeight: 'medium' })}
							>
								GitHub
							</a>
							<a href="mailto:devpig@icloud.com" class={css({ fontWeight: 'medium' })}>Email</a>
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
								<span class={css({ srOnly: true })}>Close</span>
							</div>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	</div>
</section>
