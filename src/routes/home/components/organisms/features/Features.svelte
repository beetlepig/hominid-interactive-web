<script>
	/** @import { AnimationSectionEnumType } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte' */
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import PolyhedronScene from '../../molecules/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { inView, scroll } from 'motion';
	import { animate } from 'motion';
	import { css } from 'styled-system/css';
	import { token } from 'styled-system/tokens';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let featuresContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let featuresHeadlineContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let featuresContentRef = $state(null);

	/** @type {HTMLElement | null} */
	let featuresCanvasContentRef = $state(null);

	/** @type {HTMLElement | null} */
	let reliableFrontendCanvasContentRef = $state(null);

	/** @type {HTMLElement | null} */
	let amazingTechnologiesCanvasContentRef = $state(null);

	/** @type {HTMLElement | null} */
	let flexibleDevelopmentCanvasContentRef = $state(null);

	let [currentAnimationSection, setCurrentAnimationSection] =
		/** @type {typeof createSignal<AnimationSectionEnumType>} */ (createSignal)(
			AnimationSectionEnum.Octahedron
		);

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

	const [canvasFeaturesRender, setCanvasFeaturesRender] =
		/** @type {typeof createSignal<boolean>} */ (createSignal)(false);
	const [canvasReliableFrontendRender, setCanvasReliableFrontendRender] =
		/** @type {typeof createSignal<boolean>} */ (createSignal)(false);
	const [canvasAmazingTechnologiesRender, setCanvasAmazingTechnologiesRender] =
		/** @type {typeof createSignal<boolean>} */ (createSignal)(false);
	const [canvasFlexibleDevelopmentRender, setCanvasFlexibleDevelopmentRender] =
		/** @type {typeof createSignal<boolean>} */ (createSignal)(false);

	/**
	 * @param {AnimationSectionEnumType} section
	 * @returns {number}
	 */
	const getLightColor = (section) => {
		switch (section) {
			case AnimationSectionEnum.Octahedron: {
				return 0xfee2e2;
			}
			case AnimationSectionEnum.Dodecahedron: {
				return 0xdcfce7;
			}
			case AnimationSectionEnum.Icosahedron: {
				return 0xdbeafe;
			}
			default: {
				return 0xffffff;
			}
		}
	};

	$effect(() => {
		/** @type {(progress: number) => void} */
		const scrollCallback = (progress) => {
			setScrollYProgress(progress);
		};
		const cancel = scroll(scrollCallback, {
			axis: 'y',
			container: document.getElementById('main-target') ?? undefined,
			target: featuresContainerRef ?? undefined
		});

		return () => {
			cancel();
		};
	});

	$effect(() => {
		if (featuresHeadlineContainerRef) {
			const stop = inView(
				featuresHeadlineContainerRef,
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

	$effect(() => {
		if (featuresHeadlineContainerRef) {
			const stop = inView(
				featuresHeadlineContainerRef,
				(element) => {
					animate(
						element,
						{
							opacity: [0, 1],
							x: [token('spacing.-12'), token('spacing.0')]
						},
						{
							duration: 0.4
						}
					);
				},
				{ amount: 'all' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (featuresContentRef) {
			const stop = inView(
				featuresContentRef,
				(element) => {
					animate(
						element,
						{
							opacity: [0, 1]
						},
						{
							duration: 0.4
						}
					);
				},
				{ amount: 0.15 }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (featuresCanvasContentRef) {
			const stop = inView(
				featuresCanvasContentRef,
				() => {
					setCanvasFeaturesRender(true);

					return () => {
						setCanvasFeaturesRender(false);
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (reliableFrontendCanvasContentRef) {
			const stop = inView(
				reliableFrontendCanvasContentRef,
				() => {
					setCanvasReliableFrontendRender(true);

					return () => {
						setCanvasReliableFrontendRender(false);
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (amazingTechnologiesCanvasContentRef) {
			const stop = inView(
				amazingTechnologiesCanvasContentRef,
				() => {
					setCanvasAmazingTechnologiesRender(true);

					return () => {
						setCanvasAmazingTechnologiesRender(false);
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		if (flexibleDevelopmentCanvasContentRef) {
			const stop = inView(
				flexibleDevelopmentCanvasContentRef,
				() => {
					setCanvasFlexibleDevelopmentRender(true);

					return () => {
						setCanvasFlexibleDevelopmentRender(false);
					};
				},
				{ amount: 'some' }
			);

			return () => {
				stop();
			};
		}
	});

	$effect(() => {
		switch (true) {
			case scrollYProgress() < 0.4: {
				setCurrentAnimationSection(AnimationSectionEnum.Octahedron);
				break;
			}
			case scrollYProgress() >= 0.4 && scrollYProgress() < 0.7: {
				setCurrentAnimationSection(AnimationSectionEnum.Dodecahedron);
				break;
			}
			case scrollYProgress() >= 0.7: {
				setCurrentAnimationSection(AnimationSectionEnum.Icosahedron);
				break;
			}
		}
	});
</script>

{#snippet blackSpan(/** @type {string} */ text)}
	<span class={css({ color: 'black' })}>{text}</span>
{/snippet}

<section
	id={sections.skills.id}
	bind:this={featuresContainerRef}
	class={css({
		py: '20',
		bgColor: 'gray.50'
	})}
>
	<div
		class={css({
			mx: 'auto',
			maxW: '7xl'
		})}
	>
		<div
			class={css({
				mx: '16',
				lineHeight: 'tight',
				display: 'flex',
				justifyContent: 'center'
			})}
		>
			<div bind:this={featuresHeadlineContainerRef} class={css({ opacity: 0 })}>
				<h2
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
					{m.features_how()}
				</h2>
				<h2
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
					{m.features_impact()}
				</h2>
			</div>
		</div>

		<div
			bind:this={featuresContentRef}
			class={css({
				mx: '16',
				opacity: 0,
				lg: {
					display: 'flex',
					gap: '16'
				},
				mdDown: { mx: '10' }
			})}
		>
			<div
				bind:this={featuresCanvasContentRef}
				class={css({
					display: 'flex',
					flexDirection: 'column',
					position: 'sticky',
					flex: '1',
					top: '0',
					height: '[100dvh]',
					hideBelow: 'lg'
				})}
			>
				<div
					class={css({
						my: 'auto',
						h: 'full',
						maxHeight: '3xl'
					})}
				>
					{#if canvasFeaturesRender()}
						<Canvas>
							<PolyhedronScene
								projectName="Features"
								targetAnimationSection={currentAnimationSection()}
								lightColor={getLightColor(currentAnimationSection())}
							/>
						</Canvas>
					{/if}
				</div>
			</div>
			<div class={css({ flex: '1' })}>
				<div
					class={css({
						height: { base: 'screen', lgDown: 'auto' },
						display: 'flex',
						flexDir: 'column',
						justifyContent: 'center',
						spaceY: '3'
					})}
				>
					<div
						bind:this={reliableFrontendCanvasContentRef}
						class={css({ h: '96', hideFrom: 'lg' })}
					>
						{#if canvasReliableFrontendRender()}
							<Canvas>
								<PolyhedronScene
									projectName="ReliableFrontend"
									headlineContainerRef={null}
									targetAnimationSection={AnimationSectionEnum.Octahedron}
									lightColor={getLightColor(AnimationSectionEnum.Octahedron)}
								/>
							</Canvas>
						{/if}
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '3xl', fontWeight: 'bold' })}>
						{m.features_reilable_title()}
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						{m.features_reilable_description_using()}
						{@render blackSpan(m.features_reilable_description_innovative())}
						{m.features_reilable_description_battle()}
						{@render blackSpan(m.features_reilable_description_fe())}
						{m.features_reilable_description_best()}
						{@render blackSpan(m.features_reilable_description_arch())}
						{m.features_reilable_description_ensures()}
						{@render blackSpan(m.features_reilable_description_future())}.
					</p>
				</div>
				<div
					class={css({
						height: { base: 'screen', lgDown: 'auto' },
						display: 'flex',
						flexDir: 'column',
						justifyContent: 'center',
						spaceY: '3'
					})}
				>
					<div
						bind:this={amazingTechnologiesCanvasContentRef}
						class={css({ h: '96', hideFrom: 'lg' })}
					>
						{#if canvasAmazingTechnologiesRender()}
							<Canvas>
								<PolyhedronScene
									projectName="AmazingTechnologies"
									headlineContainerRef={null}
									targetAnimationSection={AnimationSectionEnum.Dodecahedron}
									lightColor={getLightColor(AnimationSectionEnum.Dodecahedron)}
								/>
							</Canvas>
						{/if}
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '3xl', fontWeight: 'bold' })}>
						{m.features_amazing_title()}
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						{m.features_amazing_description_extensive()}
						{@render blackSpan('TypeScript')}, {@render blackSpan('React')}
						{m.features_amazing_description_and()}
						{@render blackSpan('React Native')}, {m.features_amazing_description_complemented()}
						{@render blackSpan('Svelte')}
						{m.features_amazing_description_and()}
						{@render blackSpan('Rust')}.
					</p>
				</div>
				<div
					class={css({
						height: { base: 'screen', lgDown: 'auto' },
						display: 'flex',
						flexDir: 'column',
						justifyContent: 'center',
						spaceY: '3'
					})}
				>
					<div
						bind:this={flexibleDevelopmentCanvasContentRef}
						class={css({ h: '96', hideFrom: 'lg' })}
					>
						{#if canvasFlexibleDevelopmentRender()}
							<Canvas>
								<PolyhedronScene
									projectName="FlexibleDevelopment"
									headlineContainerRef={null}
									targetAnimationSection={AnimationSectionEnum.Icosahedron}
									lightColor={getLightColor(AnimationSectionEnum.Icosahedron)}
								/>
							</Canvas>
						{/if}
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '3xl', fontWeight: 'bold' })}>
						{m.features_flexible_title()}
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						{m.features_flexible_description_adaptable()}
						{@render blackSpan('Scrum')},
						{@render blackSpan('Kanban')}{m.features_flexible_description_and()}
						{@render blackSpan('Extreme Programming')}, {m.features_flexible_description_along()}
						{@render blackSpan('CI/CD')}
						{m.features_flexible_description_processes()}
						{m.features_flexible_description_and_testing()}
						{@render blackSpan(m.features_flexible_description_e2e())}
						{m.features_flexible_description_skilled()}
						{@render blackSpan(m.features_flexible_description_cross())}, {m.features_flexible_description_including()}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
