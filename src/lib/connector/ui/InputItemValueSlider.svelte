<script lang="ts">
	import { audioBackendContextKey } from '$lib/audio/audioBackendContext';
	import { hashToUsize } from '$lib/audio/data/hashToUsize';
	import { SetAutoConnectionInputCommand } from '$lib/commands/node/SetAutoConnectionInputCommand';
	import { SetUnconnectedInputValueCommand } from '$lib/commands/node/SetUnconnectedInputValueCommand';
	import { clamp } from '$lib/connection/clamp';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { InputWithControl } from '$lib/input/InputWithControl';
	import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { formatNumber } from '$lib/ui/formatNumber';

	interface Props {
		input: InputWithControl;
		sizeElement: HTMLElement;
	}

	let element: HTMLElement;
	let initialValue: number;
	let initialClientX: number;
	let pointerId = $state<number>();
	const { input, sizeElement }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	let value = $derived(input.getUnconnectedValue());
	const { min, max, isBoolean } = $derived(input.getInputDefinition());
	const ratio = $derived((value - min) / (max - min));
	const width = $derived(100 * ratio + '%');

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
		pointerId = e.pointerId;
		initialClientX = e.clientX;
		initialValue = value;
		element.setPointerCapture(e.pointerId);
	}

	function handlePointerUp(e: PointerEvent) {
		if (!pointerId) return;
		e.stopPropagation();
		element.releasePointerCapture(pointerId);
		pointerId = undefined;
		value = getNewValue(e);

		if (value === initialValue) return;

		const command = new SetUnconnectedInputValueCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'SetUnconnectedInputValueCommand',
			projectId: projectDataContext.projectData.id,
			details: { value, inputPath: structuredClone(input.inputPath) },
		});
		editorContext.editor.execute(command);
	}

	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	function handlePointerMove(e: PointerEvent) {
		if (!pointerId) return;
		value = getNewValue(e);
		const id = hashToUsize(input.getControlNodeId());
		audioBackendContext.audioBackend?.updateControl(id, value);
	}

	function getNewValue(e: PointerEvent) {
		const { width } = sizeElement.getBoundingClientRect();
		const mouseDelta = e.clientX - initialClientX; // Total movement since click

		if (isBoolean) {
			if (mouseDelta === 0) {
				return Math.round(value);
			}
			return mouseDelta > 0 ? 1 : 0;
		} else {
			const fractionDelta = mouseDelta / width; // Normalize to [0, 1] per slider width
			const valueDelta = fractionDelta * (max - min); // Scale to value range
			let newValue = clamp(initialValue + valueDelta, min, max); // Apply to initial value

			return newValue;
		}
	}

	function handleDoubleClick() {
		const nodeDefinition = nodeDefinitionsByName[input.node.type];
		if (!nodeDefinition) return;

		const getInputDefinition = nodeDefinition.inputs.find(
			(inputDefinition) => inputDefinition.key === input.key,
		);
		if (!getInputDefinition?.autoConnection) return;

		const command = new SetAutoConnectionInputCommand({
			createdAt: new Date().toJSON(),
			details: { inputPath: input.inputPath, value: true },
			id: createId(),
			projectId: projectDataContext.projectData.id,
			type: 'SetAutoConnectionInputCommand',
		});
		editorContext.editor.execute(command);
	}
</script>

<div style:width class="pointer-events-none absolute left-0 -z-10 h-full bg-green-500/25"></div>
<button
	bind:this={element}
	style:padding-right="0.2lh"
	ondblclick={handleDoubleClick}
	onpointerdown={handlePointerDown}
	onpointerup={pointerId ? handlePointerUp : undefined}
	onpointermove={pointerId ? handlePointerMove : undefined}
	class="flex flex-1 cursor-ew-resize justify-end opacity-50 hover:bg-white/10"
>
	{formatNumber(value)}
</button>
