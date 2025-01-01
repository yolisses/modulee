<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import type { Connector } from './Connector.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext';

	interface Props {
		space: Space;
		connector: Connector;
	}
	let { space, connector }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			startConnector: connector,
			dataPointerPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handlePointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handlePointerUp as any);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPosition;
		}
	}

	function handlePointerUp(e: PointerEvent) {
		console.log('pointerup');
		if (!containerWrapper.container) return;
	}
</script>

<button onpointerdown={handlePointerDown} class="hover-bg w-full items-center whitespace-nowrap">
	<div
		class="shrink-0 rounded-full bg-green-500"
		style:width="0.9em"
		style:height="0.9em"
		style:margin="0.05em"
	></div>
	<div>{connector.name}</div>
</button>
