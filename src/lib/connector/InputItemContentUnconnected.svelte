<script lang="ts">
	import { hashToUsize } from '$lib/audio/data/hashToUsize';
	import { SetUnconnectedInputValueCommand } from '$lib/commands/node/SetUnconnectedInputValueCommand';
	import { clamp } from '$lib/connection/clamp';
	import { createId } from '$lib/global/createId';
	import type { InputWithControl } from '$lib/input/InputWithControl';
	import { formatNumber } from '../ui/formatNumber';

	interface Props {
		input: InputWithControl;
	}

	let element: HTMLElement;
	let initialValue: number;
	let initialClientX: number;
	let sizeElement: HTMLElement;
	let pointerId = $state<number>();
	const { input }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	let value = $state(input.getUnconnectedValue());
	const { min, max, isBoolean } = $derived(input.getInputDefinition());
	const ratio = $derived((value - min) / (max - min));
	const width = $derived(100 * ratio + '%');

	$effect(() => {
		value = input.getUnconnectedValue();
	});

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
</script>

<div style:width class="absolute left-0 h-full bg-green-500/25"></div>
<div class="relative flex flex-1 flex-row items-center overflow-hidden" bind:this={sizeElement}>
	<div
		title={input.name}
		style:padding-left="0.3lh"
		class="overflow-and-ellipsis flex-1 overflow-hidden hover:bg-white/10"
	>
		{input.name}
	</div>
	<div
		bind:this={element}
		onpointerdown={handlePointerDown}
		onpointerup={pointerId ? handlePointerUp : undefined}
		onpointermove={pointerId ? handlePointerMove : undefined}
		class="flex-1 cursor-ew-resize text-end opacity-50 hover:bg-white/10"
	>
		{formatNumber(value)}
	</div>
</div>
