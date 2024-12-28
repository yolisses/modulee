<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import type { Node } from '$lib/types/Node';
	import { RemoveNodeCommand } from './commands/RemoveNodeCommand';

	let { node, space, editor }: { node: Node; space: Space; editor: Editor } = $props();
	let pointerId: number | undefined = $state();
	let element: HTMLElement = $state();

	const screenSize = space.getScreenSize(node.size);
	const screenPosition = space.getScreenPosition(node.position);

	function handleClick(e: MouseEvent) {}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		const removeNodeCommand = new RemoveNodeCommand(node.id);
		editor.execute(removeNodeCommand);
		return false;
	}

	function handlePointerDown(e: PointerEvent) {
		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);
		console.log('capture');
	}

	function handlePointerMove(e: PointerEvent) {
		if (pointerId) {
			console.log(e.clientX, e.clientY);
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (!pointerId) return;
		element.releasePointerCapture(pointerId);
		pointerId = undefined;

		console.log('release');
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
