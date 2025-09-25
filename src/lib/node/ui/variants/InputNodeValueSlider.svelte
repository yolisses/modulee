<script lang="ts">
	import { UpdateInputNodeExtrasCommand } from '$lib/commands/node/attribute/UpdateInputNodeExtrasCommand';
	import { clamp } from '$lib/connection/clamp';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { InputNode } from '$lib/node/InputNode';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { formatNumber } from '$lib/ui/formatNumber';

	interface Props {
		color: string;
		inputNode: InputNode;
	}

	const { inputNode, color }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	let element: HTMLElement;
	let initialClientX: number;
	let initialValue: number;
	let pointerId = $state<number>();
	let sizingElement: HTMLElement;

	let value = $derived(inputNode.extras.default);
	// TODO add isBoolean
	const { min, max } = $derived(inputNode.extras);
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

		const command = new UpdateInputNodeExtrasCommand({
			createdAt: new Date().toJSON(),
			details: { nodeId: inputNode.id, extras: { default: value } },
			id: createId(),
			projectId: projectDataContext.projectData.id,
			type: 'UpdateInputNodeExtrasCommand',
		});
		editorContext.editor.execute(command);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!pointerId) return;
		value = getNewValue(e);
		// TODO update in audio backend
	}

	function getNewValue(e: PointerEvent) {
		const { width } = sizingElement.getBoundingClientRect();
		const mouseDelta = e.clientX - initialClientX; // Total movement since click

		const fractionDelta = mouseDelta / width; // Normalize to [0, 1] per slider width
		const valueDelta = fractionDelta * (max - min); // Scale to value range
		let newValue = clamp(initialValue + valueDelta, min, max); // Apply to initial value

		return newValue;
	}
</script>

<div
	class="relative z-0 flex overflow-clip"
	bind:this={sizingElement}
	style:border-bottom-left-radius="0.4lh"
	style:border-bottom-right-radius="0.4lh"
>
	<div
		style:background-color={color}
		style:opacity={0.25}
		style:width
		class="pointer-events-none absolute left-0 -z-10 h-full w-full"
	></div>
	<button
		bind:this={element}
		style:padding-right="0.2lh"
		onpointerdown={handlePointerDown}
		onpointerup={pointerId ? handlePointerUp : undefined}
		onpointermove={pointerId ? handlePointerMove : undefined}
		class="flex flex-1 cursor-ew-resize justify-end opacity-50 hover:bg-white/10"
	>
		{formatNumber(value)}
	</button>
</div>
