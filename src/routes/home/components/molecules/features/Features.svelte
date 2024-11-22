<script>
	/** @import { AnimationSectionEnumType } from '../../organisms/polyhedron-scene/PolyhedronSequence.svelte' */

	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans/index.js';
	import { createSignal } from '$lib';
	import PolyhedronScene from '../../organisms/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../organisms/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { inView, scroll } from 'motion';
	import { animate } from 'motion/mini';
	import { token } from 'styled-system/tokens';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let featuresContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let featuresHeadlineContainerRef = $state(null);

	/** @type {HTMLElement | null} */
	let featuresContentRef = $state(null);

	let [currentAnimationSection, setCurrentAnimationSection] =
		/** @type {typeof createSignal<AnimationSectionEnumType>} */ (createSignal)(
			AnimationSectionEnum.Pyramid
		);

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

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
		if (featuresContainerRef) {
			const stop = inView(
				featuresContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.27 }
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
				({ target }) => {
					animate(
						target,
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
				({ target }) => {
					animate(
						target,
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
		switch (true) {
			case scrollYProgress() < 0.1: {
				setCurrentAnimationSection(AnimationSectionEnum.Octahedron);
				break;
			}
			case scrollYProgress() >= 0.1 && scrollYProgress() < 0.4: {
				setCurrentAnimationSection(AnimationSectionEnum.Octahedron);
				break;
			}
			case scrollYProgress() >= 0.4: {
				setCurrentAnimationSection(AnimationSectionEnum.Octahedron);
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
		maxW: '6xl',
		mx: 'auto',
		py: '40'
	})}
>
	<div
		class={css({
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
					fontWeight: 'medium'
				})}
			>
				How I Generate
			</h2>
			<h2
				class={css({
					textAlign: 'center',
					fontFamily: 'raleway',
					fontSize: '8xl',
					fontWeight: 'black'
				})}
			>
				IMPACT
			</h2>
		</div>
	</div>
	<div bind:this={featuresContentRef} class={css({ display: 'flex', gap: '16', opacity: 0 })}>
		<div
			class={css({
				position: 'sticky',
				display: 'flex',
				alignItems: 'center',
				flex: '1',
				top: '0',
				height: 'screen',
				alignSelf: 'flex-start'
			})}
		>
			<Canvas>
				<PolyhedronScene
					projectName="features"
					headlineContainerRef={null}
					targetAnimationSection={currentAnimationSection()}
				/>
			</Canvas>
		</div>
		<div class={css({ flex: '1', paddingRight: '16' })}>
			<div
				class={css({
					height: 'screen',
					display: 'flex',
					flexDir: 'column',
					justifyContent: 'center',
					spaceY: '3'
				})}
			>
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
					)}, along with best coding practices and appropriate {@render blackSpan('architectures')},
					ensures reliable and {@render blackSpan('future-proof code')}.
				</p>
			</div>
			<div
				class={css({
					height: 'screen',
					display: 'flex',
					flexDir: 'column',
					justifyContent: 'center',
					spaceY: '3'
				})}
			>
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
					)}, {@render blackSpan('React')}, and {@render blackSpan('React Native')}, complemented by
					explorations and proof-of-concept projects in {@render blackSpan('Svelte')} and
					{@render blackSpan('Rust')}.
				</p>
			</div>
			<div
				class={css({
					height: 'screen',
					display: 'flex',
					flexDir: 'column',
					justifyContent: 'center'
				})}
			>
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
					Highly adaptable to various development workflows, including {@render blackSpan('Scrum')},
					{@render blackSpan('Kanban')}, and {@render blackSpan('Extreme Programming')}, along with
					experience in {@render blackSpan('CI/CD')} processes. Skilled in communication and coordination
					with {@render blackSpan('cross-functional teams')}, including design, product, and
					business units.
				</p>
			</div>
		</div>
	</div>
</section>
