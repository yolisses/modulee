<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { RoundConverter } from '$lib/space/RoundConverter';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { createId } from '$lib/utils/createId';
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
	let initialDataPosition = $state<Vector>();
	let initialMouseDistance = $state<Vector>();

	const roundConverter = new RoundConverter();
	const screenSize = $derived(space.getScreenSize(node.size));
	const screenPosition = $derived(space.getScreenPosition(node.position));

	function handleClick(e: MouseEvent) {}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		const removeNodeCommand = new RemoveNodeCommand({
			id: createId(),
			type: 'RemoveNodeCommand',
			details: { nodeId: node.id },
		});
		editor.execute(removeNodeCommand);
		return false;
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;

		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);

		initialDataPosition = node.position;

		const mousePosition = getPointerPosition(e);
		initialMouseDistance = screenPosition.subtract(mousePosition);
	}

	function getPointerDataPosition(e: PointerEvent) {
		const mousePosition = getPointerPosition(e);
		const screenPosition = mousePosition.add(initialMouseDistance!);
		let dataPosition = space.getDataPosition(screenPosition);
		dataPosition = roundConverter.getDataPosition(dataPosition);
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
		if (initialDataPosition && dataPosition.notEquals(initialDataPosition)) {
			const moveNodeCommand = new MoveNodeCommand({
				id: createId(),
				type: 'MoveNodeCommand',
				details: { nodeId: node.id, position: dataPosition },
			});
			editor.execute(moveNodeCommand);
		}
	}
</script>

<div
	style:outline-width="0.1em"
	style:border-radius="0.5em"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit break-words bg-zinc-500 outline outline-zinc-600"
>
	<button
		bind:this={element}
		onclick={handleClick}
		onpointerup={handlePointerUp}
		oncontextmenu={handleContextMenu}
		onpointermove={handlePointerMove}
		onpointerdown={handlePointerDown}
		class="hover-bg"
	>
		<NodeItemHeader {node} />
	</button>
	<ConnectorList {space} connectors={node.connectors} />
</div>
