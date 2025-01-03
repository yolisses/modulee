<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { getDataPointerPosition } from '$lib/utils/getDataPointerPosition';
	import JointCircle from '../connector/JointCircle.svelte';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import type { PreviewConnection } from '../input/PreviewConnection';
	import { getPreviewConnectionContext } from '../input/previewConnectionContext';
	import type { Connector } from './Connector';

	interface Props {
		space: Space;
		class?: string;
		connector: Connector;
		targetClass: any; // TODO use the real type
		onPreviewEnd: (previewConnection: PreviewConnection) => void;
	}
	let { space, connector, targetClass, onPreviewEnd, class: className }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();

		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			startConnector: connector,
			dataPointerPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handleContainerPointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handleContainerPointerMove(e: PointerEvent) {
		e.stopPropagation();

		if (!containerWrapper.container) return;

		const dataPointerPosition = getDataPointerPosition(e, space, containerWrapper.container);
		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPointerPosition;
		}
	}

	function handleContainerPointerUp(e: PointerEvent) {
		e.stopPropagation();

		if (previewConnectionWrapper.previewConnection) {
			onPreviewEnd(previewConnectionWrapper.previewConnection);
			previewConnectionWrapper.previewConnection = undefined;
		}

		if (containerWrapper.container) {
			containerWrapper.container.removeEventListener(
				'pointermove',
				handleContainerPointerMove as any,
			);
			containerWrapper.container.removeEventListener('pointerup', handleContainerPointerUp as any);
		}
	}

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof targetClass) {
			previewConnectionWrapper.previewConnection.endConnector = connector;
		}
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector, endConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof targetClass && endConnector === connector) {
			previewConnectionWrapper.previewConnection.endConnector = undefined;
		}
	}
</script>

<button
	onpointerout={handlePointerOut}
	onpointerdown={handlePointerDown}
	onpointerenter={handlePointerEnter}
	class="hover-bg w-full"
>
	<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
	<div class="pointer-events-none w-full flex-row items-center whitespace-nowrap {className}">
		<JointCircle />
		<div>{connector.id.slice(0, 4)}</div>
	</div>
</button>
