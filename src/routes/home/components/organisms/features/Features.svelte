<script>
	/** @import { AnimationSectionEnumType } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte' */
	import { createSignal } from '$lib';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import Canvas from '../../../../../components/atoms/Canvas.svelte';
	import PolyhedronScene from '../../molecules/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../molecules/polyhedron-scene/PolyhedronSequence.svelte';
	import FeatureElement from './FeatureElement.svelte';
	import { inView, scroll } from 'motion';
	import { animate } from 'motion';

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
			AnimationSectionEnum.Octahedron
		);

	const [scrollYProgress, setScrollYProgress] = createSignal(0);

	/**
	 * @param {AnimationSectionEnumType} section
	 * @returns {number}
	 */
	export const getLightColor = (section) => {
		switch (section) {
			case AnimationSectionEnum.Octahedron: {
				return 0xffffff;
			}
			case AnimationSectionEnum.Dodecahedron: {
				return 0xffffff;
			}
			case AnimationSectionEnum.Icosahedron: {
				return 0xffffff;
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
							x: [-48, 0]
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
	<span class="text-foreground">{text}</span>
{/snippet}

<section id={sections.skills.id} bind:this={featuresContainerRef} class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mx-16 flex justify-center leading-24">
			<div
				bind:this={featuresHeadlineContainerRef}
				class="text-center font-raleway text-6xl font-black opacity-0 md:text-8xl"
			>
				<h2>
					{m.features_how()}
				</h2>
				<h2>
					{m.features_impact()}
				</h2>
			</div>
		</div>

		<div bind:this={featuresContentRef} class="max-md:mx:10 mx-16 opacity-0 lg:flex lg:gap-16">
			<div class="sticky top-0 flex h-dvh flex-1 flex-col max-lg:hidden">
				<div class="my-auto h-full max-h-[50rem]">
					<Canvas>
						<PolyhedronScene
							projectName="Features"
							targetAnimationSection={currentAnimationSection()}
							lightColor={getLightColor(currentAnimationSection())}
						/>
					</Canvas>
				</div>
			</div>
			<div class="flex-1">
				<FeatureElement title={m.features_reilable_title()}>
					{#snippet canvasElement()}
						<Canvas>
							<PolyhedronScene
								projectName="ReliableFrontend"
								targetAnimationSection={AnimationSectionEnum.Octahedron}
								lightColor={getLightColor(AnimationSectionEnum.Octahedron)}
							/>
						</Canvas>
					{/snippet}
					{#snippet content()}
						{m.features_reilable_description_using()}
						{@render blackSpan(m.features_reilable_description_innovative())}
						{m.features_reilable_description_battle()}
						{@render blackSpan(m.features_reilable_description_fe())}
						{m.features_reilable_description_best()}
						{@render blackSpan(m.features_reilable_description_arch())}
						{m.features_reilable_description_ensures()}
						{@render blackSpan(m.features_reilable_description_future())}.
					{/snippet}
				</FeatureElement>

				<FeatureElement title={m.features_amazing_title()}>
					{#snippet canvasElement()}
						<Canvas>
							<PolyhedronScene
								projectName="AmazingTechnologies"
								targetAnimationSection={AnimationSectionEnum.Dodecahedron}
								lightColor={getLightColor(AnimationSectionEnum.Dodecahedron)}
							/>
						</Canvas>
					{/snippet}
					{#snippet content()}
						{m.features_amazing_description_extensive()}
						{@render blackSpan('TypeScript')}, {@render blackSpan('React')}
						{m.features_amazing_description_and()}
						{@render blackSpan('React Native')}, {m.features_amazing_description_complemented()}
						{@render blackSpan('Svelte')}
						{m.features_amazing_description_and()}
						{@render blackSpan('Rust')}.
					{/snippet}
				</FeatureElement>

				<FeatureElement title={m.features_flexible_title()}>
					{#snippet canvasElement()}
						<Canvas>
							<PolyhedronScene
								projectName="FlexibleDevelopment"
								targetAnimationSection={AnimationSectionEnum.Icosahedron}
								lightColor={getLightColor(AnimationSectionEnum.Icosahedron)}
							/>
						</Canvas>
					{/snippet}
					{#snippet content()}
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
					{/snippet}
				</FeatureElement>
			</div>
		</div>
	</div>
</section>
