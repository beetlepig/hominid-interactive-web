<script>
	import { css } from 'styled-system/css';
	import PolyhedronScene from './components/organisms/polyhedronScene/PolyhedronScene.svelte';
	import { useScrollStore } from './utils/hooks/use-scroll-store.js';
	import { Canvas } from '@threlte/core';

	const setScrollPercentage = useScrollStore()[1];

	/**
	 * @type {import('svelte/elements').UIEventHandler<HTMLDivElement>}
	 */
	const handleScroll = (event) => {
		const scrollTop = event.currentTarget.scrollTop;
		const scrollHeight = event.currentTarget.scrollHeight;
		const clientHeight = event.currentTarget.clientHeight;

		const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
		const percentageRounded = Math.round(percentage * 10) / 10;
		const percentageNormalized =
			Math.round(Math.max(0, Math.min(percentageRounded, 100)) * 10) / 10;

		setScrollPercentage(percentageNormalized);
	};
</script>

<div
	onscroll={handleScroll}
	id={'main-target'}
	class={css({ position: 'relative', h: 'full', overflow: 'auto', w: 'full' })}
>
	<div
		class={css({
			pos: 'fixed',
			left: '0',
			top: '0',
			h: 'full',
			w: 'full'
		})}
	>
		<Canvas>
			<PolyhedronScene />
		</Canvas>
	</div>

	<div
		class={css({
			w: 'full'
		})}
	>
		<div class={css({ position: 'relative' })}>
			<div class={css({ height: '[250vh]', bgColor: 'amber.50/50' })}>
				<div
					class={css({
						position: 'sticky',
						display: 'flex',
						top: '0',
						flexDir: 'column',
						justifyContent: 'center',
						height: '[100vh]'
					})}
				>
					<p class={css({ textAlign: 'center' })}>Hominid Interactive</p>
				</div>
			</div>
			<div class={css({ padding: '32' })}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae scelerisque erat.
					Phasellus ex metus, volutpat et varius eget, pellentesque quis quam. Suspendisse sed
					blandit arcu. Nullam nec elit fringilla, sollicitudin massa eu, auctor lorem. Morbi vitae
					imperdiet leo. Duis mollis metus imperdiet dui placerat, non consequat risus malesuada.
					Cras commodo sapien vitae ultricies interdum. Phasellus accumsan lacus vitae odio
					elementum mattis eu a orci.
				</p>
			</div>
			<div
				class={css({
					bgColor: 'red.400/30',
					display: 'flex'
				})}
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec
							ornare dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis
							consectetur quam vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor
							non. Cras eget rhoncus nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis
							viverra urna lacinia. Donec dapibus facilisis rutrum. Vestibulum nec feugiat diam, et
							fermentum enim. Mauris sollicitudin mi ac tempor cursus. In hac habitasse platea
							dictumst. Nunc vitae enim feugiat, sagittis nunc sit amet, blandit dolor. In sit amet
							enim massa. Donec lacinia consectetur maximus. Vestibulum eget urna a diam rutrum
							scelerisque. Phasellus scelerisque, lacus eget dictum suscipit, nibh metus luctus
							diam, vel faucibus enim ante sit amet nisi.
						</p>
						<p>
							Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat
							efficitur nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet
							scelerisque iaculis. Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet.
							Donec egestas enim eget eros feugiat imperdiet. In consectetur dictum mollis. In
							volutpat at sapien nec lacinia. Aliquam vitae sem nibh. Sed in turpis erat. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare massa quis lacus
							scelerisque, non suscipit turpis suscipit. Morbi ut pharetra justo.
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec
							ornare dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis
							consectetur quam vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor
							non. Cras eget rhoncus nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis
							viverra urna lacinia. Donec dapibus facilisis rutrum. Vestibulum nec feugiat diam, et
							fermentum enim. Mauris sollicitudin mi ac tempor cursus. In hac habitasse platea
							dictumst. Nunc vitae enim feugiat, sagittis nunc sit amet, blandit dolor. In sit amet
							enim massa. Donec lacinia consectetur maximus. Vestibulum eget urna a diam rutrum
							scelerisque. Phasellus scelerisque, lacus eget dictum suscipit, nibh metus luctus
							diam, vel faucibus enim ante sit amet nisi.
						</p>
						<p>
							Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat
							efficitur nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet
							scelerisque iaculis. Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet.
							Donec egestas enim eget eros feugiat imperdiet. In consectetur dictum mollis. In
							volutpat at sapien nec lacinia. Aliquam vitae sem nibh. Sed in turpis erat. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare massa quis lacus
							scelerisque, non suscipit turpis suscipit. Morbi ut pharetra justo.
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et posuere ipsum, nec
							ornare dui. Pellentesque a nibh diam. Vivamus facilisis justo velit, venenatis
							consectetur quam vehicula vel. Cras rutrum pulvinar nibh, sed porttitor nisl porttitor
							non. Cras eget rhoncus nibh, sed congue lectus. Cras sodales ipsum et dui congue, quis
							viverra urna lacinia. Donec dapibus facilisis rutrum. Vestibulum nec feugiat diam, et
							fermentum enim. Mauris sollicitudin mi ac tempor cursus. In hac habitasse platea
							dictumst. Nunc vitae enim feugiat, sagittis nunc sit amet, blandit dolor. In sit amet
							enim massa. Donec lacinia consectetur maximus. Vestibulum eget urna a diam rutrum
							scelerisque. Phasellus scelerisque, lacus eget dictum suscipit, nibh metus luctus
							diam, vel faucibus enim ante sit amet nisi.
						</p>
						<p>
							Nullam congue turpis vitae neque laoreet, at pulvinar urna tempor. Donec volutpat
							efficitur nulla, nec laoreet mi dignissim vel. Curabitur fringilla erat sit amet
							scelerisque iaculis. Fusce pretium augue nec lorem maximus, sed faucibus nisi laoreet.
							Donec egestas enim eget eros feugiat imperdiet. In consectetur dictum mollis. In
							volutpat at sapien nec lacinia. Aliquam vitae sem nibh. Sed in turpis erat. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare massa quis lacus
							scelerisque, non suscipit turpis suscipit. Morbi ut pharetra justo.
						</p>
					</div>
				</div>
			</div>
			<div class={css({ height: '[100vh]', bgColor: 'green.200/50' })}>
				<p>carrousel</p>
			</div>
			<div class={css({ height: '[100vh]', bgColor: 'indigo.950/50' })}>
				<p>chat</p>
			</div>
		</div>
	</div>
</div>
