<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Node } from '$lib/types/Node';
	import { RemoveNodeCommand } from './commands/RemoveNodeCommand';

	let {
		node,
		space,
		editor,
		parent
	}: { node: Node; space: Space; editor: Editor; parent: HTMLElement } = $props();

	let pointerId = $state<number>();
	let element: HTMLElement = $state();
	let position = $state(node.position);

	const screenSize = space.getScreenSize(node.size);
	const screenPosition = $derived(space.getScreenPosition(position));

	function handleClick(e: MouseEvent) {}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		const removeNodeCommand = new RemoveNodeCommand(node.id);
		editor.execute(removeNodeCommand);
		return false;
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;

		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!pointerId) return;

		const rect = parent.getBoundingClientRect();
		const screenPosition = new Vector(e.clientX - rect.left, e.clientY - rect.top);
		const dataPosition = space.getDataPosition(screenPosition);
		position = dataPosition;
	}

	function handlePointerUp(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!pointerId) return;

		element.releasePointerCapture(pointerId);
		pointerId = undefined;
	}
</script>

<button
	bind:this={element}
	onclick={handleClick}
	onpointerup={handlePointerUp}
	oncontextmenu={handleContextMenu}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit break-words bg-gray-500"
>
	{node.id}
</button>
