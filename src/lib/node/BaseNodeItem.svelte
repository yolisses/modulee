<script lang="ts">
	import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand.js';
	import { ConnectorCondition } from '$lib/connector/ConnectorCondition.js';
	import InputItem from '$lib/connector/InputItem.svelte';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import {
		NodeItem as BaseNodeItem,
		ConnectorAreaPointerStrategy,
		getSelectedNodeIdsContext,
		PointerEventDispatcher,
	} from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { Node } from '../data/Node.svelte.js';
	import NodeItemHeader from './NodeItemHeader.svelte';

	interface Props {
		node: Node;
		headerChildren?: Snippet;
		preInputsChildren?: Snippet;
		postInputsChildren?: Snippet;
	}

	const spaceContext = getSpaceContext();
	const { node, postInputsChildren, preInputsChildren, headerChildren }: Props = $props();

	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));
	const screenPosition = $derived(spaceContext.space.getScreenPosition(node.position));

	const connectorId = node.output.id;
	const connectorCondition = new ConnectorCondition();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connectorId,
		connectorCondition.endConnectorCondition,
	);

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		const removeNodeCommand = new RemoveNodeCommand({
			id: createId(),
			type: 'RemoveNodeCommand',
			details: { nodeId: node.id },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(removeNodeCommand);
		selectedNodeIdsContext.selectedNodeIds.delete(node.id);
	}
</script>

<PointerEventDispatcher
	pointerStrategy={connectorAreaPointerStrategy}
	oncontextmenu={handleContextMenu}
>
	<BaseNodeItem {node} position={screenPosition}>
		<div
			style:width="5lh"
			style:outline-width="0.1lh"
			style:border-radius="0.4lh"
			class:outline-blue-500={isSelected}
			class:outline-zinc-800={!isSelected}
			class="flex flex-col bg-zinc-700 outline"
		>
			<NodeItemHeader {node}>
				{@render headerChildren?.()}
			</NodeItemHeader>

			{@render preInputsChildren?.()}

			{#each node.inputs as input (input.name)}
				<InputItem {input} />
			{/each}

			{@render postInputsChildren?.()}
		</div>
	</BaseNodeItem>
</PointerEventDispatcher>
