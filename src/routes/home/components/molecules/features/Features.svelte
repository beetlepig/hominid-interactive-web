<script>
	/** @import { AnimationSectionEnumType } from '../../organisms/polyhedron-scene/PolyhedronSequence.svelte' */

	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { sections } from '$lib/constans/index.js';
	import { createSignal } from '$lib';
	import PolyhedronScene from '../../organisms/polyhedron-scene/PolyhedronScene.svelte';
	import { AnimationSectionEnum } from '../../organisms/polyhedron-scene/PolyhedronSequence.svelte';
	import { Canvas } from '@threlte/core';
	import { scroll } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let featuresContainerRef = $state(null);

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
		switch (true) {
			case scrollYProgress() < 0.1: {
				setCurrentAnimationSection(AnimationSectionEnum.Pyramid);
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

<div
	id={sections.skills.id}
	bind:this={featuresContainerRef}
	class={css({
		display: 'flex',
		gap: '6',
		maxW: '7xl',
		mx: 'auto'
	})}
	use:interceptionObserverAction={{ onIntercepted: onVisible, threshold: [0.3] }}
>
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
				Reliable Frontend.
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
				Reliable Frontend.
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
				justifyContent: 'center'
			})}
		>
			<h3 class={css({ fontFamily: 'raleway', fontSize: '4xl', fontWeight: 'bold' })}>
				Reliable Frontend.
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
	</div>
</div>
