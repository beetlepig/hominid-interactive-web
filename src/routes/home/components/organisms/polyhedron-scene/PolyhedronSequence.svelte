<script module>
	/**
	 * @typedef {keyof AnimationSectionEnum} AnimationSectionEnumType
	 */
	const AnimationSectionEnum = Object.freeze({
		Pyramid: 'Pyramid',
		Octahedron: 'Octahedron'
	});

	/**
	 * @typedef {keyof AnimationStateEnum} AnimationStateEnumType
	 */
	const AnimationStateEnum = Object.freeze({
		Enter: 'Enter',
		Idle: 'Idle',
		Exit: 'Exit'
	});

	/**
	 * @typedef {[number, number, number | Infinity]} RangeType
	 */
	/**
	 * @type {{[key in AnimationSectionEnumType]: {[key in AnimationStateEnumType]: RangeType}}}
	 */
	const AnimationSection = {
		[AnimationSectionEnum.Pyramid]: {
			[AnimationStateEnum.Enter]: [0, 0.5, 1],
			[AnimationStateEnum.Idle]: [0.5, 6.5, Infinity],
			[AnimationStateEnum.Exit]: [6.5, 7, 1]
		},
		[AnimationSectionEnum.Octahedron]: {
			[AnimationStateEnum.Enter]: [7, 7.5, 1],
			[AnimationStateEnum.Idle]: [7.5, 13.5, Infinity],
			[AnimationStateEnum.Exit]: [13.5, 14, 1]
		}
	};

	export { AnimationSectionEnum };
</script>

<script>
	import { Sequence } from '@threlte/theatre';
	import { createSignal } from '$lib';

	/**
	 * @type {((opts?: {}) => Promise<boolean>) | undefined}
	 */
	let play = $state();

	/**
	 * @type {boolean | undefined}
	 */
	let playing = $state();

	/**
	 * @type {number | undefined}
	 */
	let position = $state();

	/**
	 * @type {{ targetAnimationSection: AnimationSectionEnumType }}
	 */
	const { targetAnimationSection } = $props();

	let [currentAnimationSection, setCurrentAnimationSection] =
		/** @type {typeof createSignal<AnimationSectionEnumType>} */ (createSignal)(
			targetAnimationSection
		);

	let [currentAnimationState, setCurrentAnimationState] =
		/** @type {typeof createSignal<AnimationStateEnumType>} */ (createSignal)(
			AnimationStateEnum.Enter
		);

	/**
	 * @type {RangeType}
	 */
	const currentRange = $derived(
		AnimationSection[currentAnimationSection()][currentAnimationState()]
	);

	/**
	 * @type {[number, number]}
	 */
	const currentAnimationRange = $derived([currentRange[0], currentRange[1]]);

	/**
	 * @type {number}
	 */
	let iterationCount = $state(1);

	$effect(() => {
		if (currentAnimationSection() !== targetAnimationSection) {
			iterationCount = 1;
		} else {
			iterationCount = currentRange[2];
		}
	});

	$effect(() => {
		if (iterationCount === 1 && !playing && position === currentAnimationRange[1]) {
			switch (currentAnimationState()) {
				case AnimationStateEnum.Enter: {
					setCurrentAnimationState(AnimationStateEnum.Idle);
					break;
				}
				case AnimationStateEnum.Idle: {
					setCurrentAnimationState(AnimationStateEnum.Exit);
					break;
				}
				case AnimationStateEnum.Exit: {
					setCurrentAnimationSection(targetAnimationSection);
					setCurrentAnimationState(AnimationStateEnum.Enter);
					break;
				}
			}

			play?.();
		}
	});
</script>

<Sequence
	bind:position
	bind:play
	bind:playing
	range={currentAnimationRange}
	delay={100}
	{iterationCount}
	autoplay
/>
