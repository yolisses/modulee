<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { MoveNodeCommand } from './commands/MoveNodeCommand';
	import { RemoveNodeCommand } from './commands/RemoveNodeCommand';
	import ConnectorList from './connector/ConnectorList.svelte';
	import { getPointerPosition } from './getPointerPosition';
	import type { Node } from './Node.svelte';
	import NodeItemHeader from './NodeItemHeader.svelte';

	interface Props {
		node: Node;
		space: Space;
		editor: Editor;
	}

	let { node, space, editor }: Props = $props();

	let element: HTMLElement;
	let pointerId = $state<number>();
	let initialMouseDistance = $state<Vector>();

	const screenSize = $derived(space.getScreenSize(node.size));
	const screenPosition = $derived(space.getScreenPosition(node.position));

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
		const mousePosition = getPointerPosition(e);
		initialMouseDistance = screenPosition.subtract(mousePosition);
	}

	function getPointerDataPosition(e: PointerEvent) {
		const mousePosition = getPointerPosition(e);
		const screenPosition = mousePosition.add(initialMouseDistance!);
		const dataPosition = space.getDataPosition(screenPosition);
		return dataPosition;
	}

	function handlePointerMove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!pointerId) return;

		node.position = getPointerDataPosition(e);
	}

	function handlePointerUp(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!pointerId) return;

		element.releasePointerCapture(pointerId);
		pointerId = undefined;

		const dataPosition = getPointerDataPosition(e);
		const moveNodeCommand = new MoveNodeCommand(node.id, dataPosition);
		editor.execute(moveNodeCommand);
	}
</script>

<button
	bind:this={element}
	onclick={handleClick}
	style:border-radius="0.5em"
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
	<div>
		<NodeItemHeader {node} />
		<ConnectorList connectors={node.connectors} />
	</div>
</button>
