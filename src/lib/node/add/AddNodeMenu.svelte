<script lang="ts">
	import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName.js';
	import type { Vector } from 'nodes-editor';
	import { createNodeData } from './createNodeData.js';
	import { nodesName } from './nodeNames.js';
	import type { NodeType } from './NodeType.js';
	import { nodeTypes } from './nodeTypes.js';

	interface Props {
		closeModal: () => void;
		screenPosition: Vector;
	}

	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const internalModuleIdContext = getInternalModuleIdContext();
	const projectDataContext = getProjectDataContext();

	let searchText = $state('');

	const { closeModal, screenPosition }: Props = $props();

	function handleTypeSelect(nodeType: NodeType) {
		const dataPosition = spaceContext.space.getDataPosition(screenPosition).round();
		const nodeData = createNodeData(
			nodeType,
			internalModuleIdContext.internalModuleId,
			dataPosition,
		);
		const addNodeCommand = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: { node: nodeData },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}

	function getNodeTypeName(nodeType: NodeType) {
		return nodesName[nodeType.name];
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (searchText.length === 0) return;
		const option = options[0];
		if (!option) return;
		handleTypeSelect(option);
	}

	const options = $derived(
		nodeTypes.filter((nodeType) => {
			return getNodeTypeName(nodeType).toLowerCase().includes(searchText.toLowerCase());
		}),
	);
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline outline-1 outline-zinc-800"
>
	<!-- svelte-ignore a11y_autofocus -->
	<input
		autofocus
		type="search"
		placeholder="Search"
		class="common-input"
		bind:value={searchText}
		onkeydown={handleKeyDown}
	/>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<BasicList
			getId={getName}
			values={options}
			getName={getNodeTypeName}
			onClick={handleTypeSelect}
		/>
	</div>
</div>

<style>
	/* Scrollbar */
	/* width */
	.scroll-small::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}
</style>
