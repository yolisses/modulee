<script lang="ts">
	import { SetModuleNodeModuleReferenceCommand } from '$lib/commands/node/SetModuleNodeModuleReferenceCommand';
	import { createId } from '$lib/data/createId.js';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Module } from '$lib/data/Module';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import CreateInternalModuleButton from './CreateInternalModuleButton.svelte';
	import { getInternalModuleIdContext } from './internalModuleIdContext';
	import SearchExternalModuleButton from './SearchExternalModuleButton.svelte';

	interface Props {
		moduleNodeId: string;
		closeModal: () => void;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	const { closeModal, moduleNodeId }: Props = $props();

	function handleSelectModule(module: Module) {
		const moduleReference = module.getReference();
		const command = new SetModuleNodeModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			details: { moduleNodeId, moduleReference },
			type: 'SetModuleNodeModuleReferenceCommand',
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
		closeModal();
	}

	function getName(module: Module) {
		return module.name;
	}

	function handleInternalModuleCreated(module: Module) {
		handleSelectModule(module);
	}
</script>

<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline-1 outline-zinc-800"
>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<BasicList
			{getId}
			{getName}
			onClick={handleSelectModule}
			items={graphContext.graph.modules
				.values()
				.filter((module) => module.id !== internalModuleIdContext.internalModuleId)}
		/>
		<SearchExternalModuleButton {moduleNodeId} />
		<CreateInternalModuleButton onInternalModuleCreated={handleInternalModuleCreated} />
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
