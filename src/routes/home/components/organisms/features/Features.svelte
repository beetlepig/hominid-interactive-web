<script>
	/** @import { AnimationSectionEnumType } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte' */
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import PolyhedronScene from '../../molecules/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { inView, scroll } from 'motion';
	import { animate } from 'motion/mini';
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

	const [canvasFeaturesRenderMode, setCanvasFeaturesRenderMode] =
		/** @type {typeof createSignal<'on-demand' | 'manual'>} */ (createSignal)('manual');
	const [canvasReliableFrontendRenderMode, setCanvasReliableFrontendRenderMode] =
		/** @type {typeof createSignal<'on-demand' | 'manual'>} */ (createSignal)('manual');
	const [canvasAmazingTechnologiesRenderMode, setCanvasAmazingTechnologiesRenderMode] =
		/** @type {typeof createSignal<'on-demand' | 'manual'>} */ (createSignal)('manual');
	const [canvasFlexibleDevelopmentRenderMode, setCanvasFlexibleDevelopmentRenderMode] =
		/** @type {typeof createSignal<'on-demand' | 'manual'>} */ (createSignal)('manual');

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
				{ amount: 'some' }
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
							transform: [
								`translateX(${token('spacing.-12')})`,
								`translateX(${token('spacing.0')})`
							]
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
					setCanvasFeaturesRenderMode('on-demand');

					return () => {
						setCanvasFeaturesRenderMode('manual');
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
					setCanvasReliableFrontendRenderMode('on-demand');

					return () => {
						setCanvasReliableFrontendRenderMode('manual');
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
					setCanvasAmazingTechnologiesRenderMode('on-demand');

					return () => {
						setCanvasAmazingTechnologiesRenderMode('manual');
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
					setCanvasFlexibleDevelopmentRenderMode('on-demand');

					return () => {
						setCanvasFlexibleDevelopmentRenderMode('manual');
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
		py: '40',
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
						textAlign: 'left',
						fontFamily: 'oswald',
						fontSize: '2xl',
						fontWeight: 'medium',
						smDown: {
							fontSize: 'lg'
						}
					})}
				>
					How I Generate
				</h2>
				<h2
					class={css({
						textAlign: 'center',
						fontFamily: 'raleway',
						fontSize: '8xl',
						fontWeight: 'black',
						smDown: {
							fontSize: '6xl'
						}
					})}
				>
					IMPACT
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
					position: 'sticky',
					display: 'flex',
					alignItems: 'center',
					flex: '1',
					top: '0',
					height: 'screen',
					alignSelf: 'flex-start',
					hideBelow: 'lg'
				})}
			>
				<Canvas renderMode={canvasFeaturesRenderMode()}>
					<PolyhedronScene
						projectName="Features"
						headlineContainerRef={null}
						targetAnimationSection={currentAnimationSection()}
					/>
				</Canvas>
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
						<Canvas renderMode={canvasReliableFrontendRenderMode()}>
							<PolyhedronScene
								projectName="ReliableFrontend"
								headlineContainerRef={null}
								targetAnimationSection={AnimationSectionEnum.Octahedron}
							/>
						</Canvas>
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '4xl', fontWeight: 'bold' })}>
						Reliable Frontend
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						Using {@render blackSpan('innovative')}, battle-tested {@render blackSpan(
							'frontend technologies'
						)}, along with best coding practices and appropriate {@render blackSpan(
							'architectures'
						)}, ensures reliable and {@render blackSpan('future-proof code')}.
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
						<Canvas renderMode={canvasAmazingTechnologiesRenderMode()}>
							<PolyhedronScene
								projectName="AmazingTechnologies"
								headlineContainerRef={null}
								targetAnimationSection={AnimationSectionEnum.Dodecahedron}
							/>
						</Canvas>
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '4xl', fontWeight: 'bold' })}>
						Amazing Technologies
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						I have extensive experience with widely used technologies like {@render blackSpan(
							'TypeScript'
						)}, {@render blackSpan('React')}, and {@render blackSpan('React Native')}, complemented
						by explorations and personal projects in {@render blackSpan('Svelte')} and
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
						<Canvas renderMode={canvasFlexibleDevelopmentRenderMode()}>
							<PolyhedronScene
								projectName="FlexibleDevelopment"
								headlineContainerRef={null}
								targetAnimationSection={AnimationSectionEnum.Icosahedron}
							/>
						</Canvas>
					</div>
					<h3 class={css({ fontFamily: 'raleway', fontSize: '4xl', fontWeight: 'bold' })}>
						Flexible Development
					</h3>
					<p
						class={css({
							fontSize: 'xl',
							fontFamily: 'raleway',
							fontWeight: 'semibold',
							color: 'gray.500'
						})}
					>
						Highly adaptable to various development workflows, including {@render blackSpan(
							'Scrum'
						)},
						{@render blackSpan('Kanban')}, and {@render blackSpan('Extreme Programming')}, along
						with experience in {@render blackSpan('CI/CD')} processes. Skilled in communication and coordination
						with {@render blackSpan('cross-functional teams')}, including design, product, and
						business units.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
