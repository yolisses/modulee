<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { createId } from '$lib/utils/createId';
	import { getDataPointerPosition } from '$lib/utils/getDataPointerPosition';
	import { SetInputConnectedOutput } from '../commands/SetInputConnectedOutput';
	import JointCircle from '../connector/JointCircle.svelte';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';
	import InputItemWire from './InputItemWire.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext';

	interface Props {
		space: Space;
		input: Input;
		editor: Editor;
	}
	let { space, input, editor }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			startConnector: input,
			dataPointerPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handleContainerPointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handleContainerPointerMove(e: PointerEvent) {
		if (!containerWrapper.container) return;
		const dataPointerPosition = getDataPointerPosition(e, space, containerWrapper.container);
		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPointerPosition;
		}
	}

	function handleContainerPointerUp(e: PointerEvent) {
		if (previewConnectionWrapper.previewConnection) {
			const { endConnector: output } = previewConnectionWrapper.previewConnection;

			if (output instanceof Output) {
				const command = new SetInputConnectedOutput({
					id: createId(),
					type: 'SetInputConnectedOutput',
					details: { inputId: input.id, outputId: output?.id },
				});
				editor.execute(command);
			}
		}

		previewConnectionWrapper.previewConnection = undefined;

		if (!containerWrapper.container) return;
		containerWrapper.container.removeEventListener(
			'pointermove',
			handleContainerPointerMove as any,
		);
		containerWrapper.container.removeEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof Output) {
			previewConnectionWrapper.previewConnection.endConnector = input;
		}
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector, endConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof Output && endConnector === input) {
			previewConnectionWrapper.previewConnection.endConnector = undefined;
		}
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	{#if input.connectedOutput}
		<InputItemWire {input} {space} output={input.connectedOutput} />
	{/if}
	<button
		class="hover-bg w-full"
		onpointerout={handlePointerOut}
		onpointerdown={handlePointerDown}
		onpointerenter={handlePointerEnter}
	>
		<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
		<div class="pointer-events-none flex-row items-center whitespace-nowrap">
			<JointCircle />
			<div>{input.id.slice(0, 4)}</div>
		</div>
	</button>
</div>
