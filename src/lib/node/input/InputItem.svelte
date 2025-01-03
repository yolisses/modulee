<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { createId } from '$lib/utils/createId';
	import { SetInputConnectedOutput } from '../commands/SetInputConnectedOutput';
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

	function getDataPointerPosition(e: PointerEvent, container: Element) {
		const containerPosition = getElementPosition(container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);
		return dataPosition;
	}

	function handleContainerPointerMove(e: PointerEvent) {
		if (!containerWrapper.container) return;
		const dataPointerPosition = getDataPointerPosition(e, containerWrapper.container);
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
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	{#if input.connectedOutput}
		<InputItemWire {input} {space} output={input.connectedOutput} />
	{/if}
	<button class="hover-bg w-full" onpointerdown={handlePointerDown}>
		<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
		<div class="pointer-events-none flex-row items-center whitespace-nowrap">
			<div
				style:width="0.8em"
				style:height="0.8em"
				style:margin="0.1em"
				class="shrink-0 rounded-full bg-green-500"
			></div>
			<div>
				{input.id.slice(0, 4)}
			</div>
		</div>
	</button>
</div>
