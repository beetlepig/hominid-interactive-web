<script>
	import { css } from 'styled-system/css';
	import { interceptionObserverAction } from '../../../utils/actions/interception-observer-action.svelte.js';
	import { sections } from '$lib/constans/index.js';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();
</script>

<div
	id={sections.skills.id}
	class={css({
		bgColor: 'red.400/30',
		display: 'flex'
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
			height: '[100vh]',
			alignSelf: 'flex-start',
			bgColor: 'yellow.50/70'
		})}
	>
		<p class={css({ flex: '1', textAlign: 'center' })}>
			Lorem ipsum dolor sit amet, consectetur adipiscing.
		</p>
	</div>
	<div class={css({ flex: '1' })}>
		<div
			class={css({
				height: '[100vh]',
				bgColor: 'blue.50/50',
				display: 'flex',
				flexDir: 'column',
				justifyContent: 'center'
			})}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec ornare
				dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis consectetur quam
				vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor non. Cras eget rhoncus
				nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis viverra urna lacinia. Donec
				dapibus facilisis rutrum. Vestibulum nec feugiat diam, et fermentum enim. Mauris
				sollicitudin mi ac tempor cursus. In hac habitasse platea dictumst. Nunc vitae enim feugiat,
				sagittis nunc sit amet, blandit dolor. In sit amet enim massa. Donec lacinia consectetur
				maximus. Vestibulum eget urna a diam rutrum scelerisque. Phasellus scelerisque, lacus eget
				dictum suscipit, nibh metus luctus diam, vel faucibus enim ante sit amet nisi.
			</p>
			<p>
				Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat efficitur
				nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet scelerisque iaculis.
				Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet. Donec egestas enim eget
				eros feugiat imperdiet. In consectetur dictum mollis. In volutpat at sapien nec lacinia.
				Aliquam vitae sem nibh. Sed in turpis erat. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Suspendisse ornare massa quis lacus scelerisque, non suscipit turpis
				suscipit. Morbi ut pharetra justo.
			</p>
		</div>
		<div
			class={css({
				height: '[100vh]',
				display: 'flex',
				bgColor: 'pink.100/50',
				flexDir: 'column',
				justifyContent: 'center'
			})}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec ornare
				dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis consectetur quam
				vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor non. Cras eget rhoncus
				nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis viverra urna lacinia. Donec
				dapibus facilisis rutrum. Vestibulum nec feugiat diam, et fermentum enim. Mauris
				sollicitudin mi ac tempor cursus. In hac habitasse platea dictumst. Nunc vitae enim feugiat,
				sagittis nunc sit amet, blandit dolor. In sit amet enim massa. Donec lacinia consectetur
				maximus. Vestibulum eget urna a diam rutrum scelerisque. Phasellus scelerisque, lacus eget
				dictum suscipit, nibh metus luctus diam, vel faucibus enim ante sit amet nisi.
			</p>
			<p>
				Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat efficitur
				nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet scelerisque iaculis.
				Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet. Donec egestas enim eget
				eros feugiat imperdiet. In consectetur dictum mollis. In volutpat at sapien nec lacinia.
				Aliquam vitae sem nibh. Sed in turpis erat. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Suspendisse ornare massa quis lacus scelerisque, non suscipit turpis
				suscipit. Morbi ut pharetra justo.
			</p>
		</div>
		<div
			class={css({
				height: '[100vh]',
				bgColor: 'blue.50/50',
				display: 'flex',
				flexDir: 'column',
				justifyContent: 'center'
			})}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec ornare
				dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis consectetur quam
				vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor non. Cras eget rhoncus
				nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis viverra urna lacinia. Donec
				dapibus facilisis rutrum. Vestibulum nec feugiat diam, et fermentum enim. Mauris
				sollicitudin mi ac tempor cursus. In hac habitasse platea dictumst. Nunc vitae enim feugiat,
				sagittis nunc sit amet, blandit dolor. In sit amet enim massa. Donec lacinia consectetur
				maximus. Vestibulum eget urna a diam rutrum scelerisque. Phasellus scelerisque, lacus eget
				dictum suscipit, nibh metus luctus diam, vel faucibus enim ante sit amet nisi.
			</p>
			<p>
				Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat efficitur
				nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet scelerisque iaculis.
				Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet. Donec egestas enim eget
				eros feugiat imperdiet. In consectetur dictum mollis. In volutpat at sapien nec lacinia.
				Aliquam vitae sem nibh. Sed in turpis erat. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Suspendisse ornare massa quis lacus scelerisque, non suscipit turpis
				suscipit. Morbi ut pharetra justo.
			</p>
		</div>
	</div>
</div>
