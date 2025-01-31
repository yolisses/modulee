<script lang="ts">
	import { SetInputConnectedOutput } from '$lib/commands/SetInputConnectedOutput.js';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import {
		NodeList as BaseNodeList,
		getPreviewConnectionContext,
		PreviewConnectionPointerStrategy,
		SelectionBoxPointerStrategy,
		type EndPreviewConnectionEvent,
	} from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import { getInputAndOutput } from './getInputAndOutput.js';
	import { getScreenFontSize } from './getScreenFontSize.js';
	import { getScreenLineHeight } from './getScreenLineHeight.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		nodes: Node[];
	}

	const { nodes }: Props = $props();
	let mouseEvent = $state<MouseEvent>();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleEndPreviewConnection(e: EndPreviewConnectionEvent) {
		const { input, output } = getInputAndOutput(e);
		if (!input) return;
		const command = new SetInputConnectedOutput({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'SetInputConnectedOutput',
			projectId: projectDataContext.projectData.id,
			details: { inputId: input.id, outputId: output?.id },
		});
		editorContext.editor.execute(command);
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		mouseEvent = e;
	}

	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
		handleEndPreviewConnection,
	);
	const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy();

	const previewConnectionContext = getPreviewConnectionContext();
	const pointerStrategy = $derived(
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);
</script>

<div
	class="flex flex-1 select-none flex-col"
	style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
	style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
>
	<BaseNodeList oncontextmenu={handleContextMenu} {pointerStrategy}>
		{#each nodes as node (node.id)}
			<NodeItem {node} />
		{/each}
		<PreviewConnectionWire />
		<AddNodeMenuWrapper {mouseEvent} />
		<SelectionBox />

		<!-- This is here instead of in InputItem because BaseNodeItem there's
		the node position offset -->
		{#each nodes as node (node.id)}
			{#each node.inputs as input (input.id)}
				<ConnectionItem {input} />
			{/each}
		{/each}
	</BaseNodeList>
</div>

<style lang="postcss">
	:global(.node-list) {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8888 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
