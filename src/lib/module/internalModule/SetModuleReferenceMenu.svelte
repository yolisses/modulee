<script lang="ts">
	import { SetModuleNodeModuleReferenceCommand } from '$lib/commands/node/SetModuleNodeModuleReferenceCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId.js';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import type { Module } from '$lib/module/Module';
	import type { ModalState } from '$lib/project/ui/ModalState.svelte';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import CreateInternalModuleButton from './CreateInternalModuleButton.svelte';
	import { internalModuleIdContextKey } from './internalModuleIdContext';
	import SearchExternalModuleButton from './SearchExternalModuleButton.svelte';

	interface Props {
		moduleNodeId: string;
		modalState: ModalState;
	}

	const { modalState, moduleNodeId }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const graphContext = getRequiredContext(graphContextKey);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

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
		modalState.close();
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
