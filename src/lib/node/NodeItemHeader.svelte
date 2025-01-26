<script lang="ts">
	import { MoveNodeCommand } from '$lib/commands/MoveNodeCommand.js';
	import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import type { Editor } from '$lib/editor/Editor.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import { Mover, Vector, type MoveEvent } from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import { nodesName } from './add/nodeNames.js';

	interface Props {
		node: Node;
		space: Space;
		editor: Editor;
		projectId: string;
	}

	const { node, space, editor, projectId }: Props = $props();
	let initialNodePosition = $state(Vector.zero());

	function getMoveDataPosition({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		const screenInitialNodePosition = space.getScreenPosition(initialNodePosition);
		const screenNodePosition = mouseRelativePosition
			.add(screenInitialNodePosition)
			.subtract(initialMouseRelativePosition);
		return space.getDataPosition(screenNodePosition).floor();
	}

	function handleStartMove(e: MoveEvent) {
		initialNodePosition = node.position.clone();
	}

	function handleMove(e: MoveEvent) {
		const dataPosition = getMoveDataPosition(e);
		node.position = dataPosition;
	}

	function handleEndMove(e: MoveEvent) {
		const dataPosition = getMoveDataPosition(e);
		const moveNodeCommand = new MoveNodeCommand({
			projectId,
			id: createId(),
			type: 'MoveNodeCommand',
			createdAt: new Date().toJSON(),
			details: { nodeId: node.id, position: dataPosition },
		});
		editor.execute(moveNodeCommand);
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		const removeNodeCommand = new RemoveNodeCommand({
			projectId,
			id: createId(),
			type: 'RemoveNodeCommand',
			details: { nodeId: node.id },
			createdAt: new Date().toJSON(),
		});
		editor.execute(removeNodeCommand);
	}
</script>

<Mover
	onMove={handleMove}
	onEndMove={handleEndMove}
	onStartMove={handleStartMove}
	oncontextmenu={handleContextMenu}
>
	<div class="hover-bg" style:padding-inline="0.5lh">
		{nodesName[node.type]}
	</div>
</Mover>
