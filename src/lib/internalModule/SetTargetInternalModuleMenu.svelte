<script lang="ts">
	import { SetModuleNodeTargetInternalModuleIdCommand } from '$lib/commands/node/SetModuleNodeTargetInternalModuleIdCommand';
	import { createId } from '$lib/data/createId.js';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName.js';
	import CreateInternalModuleButton from './CreateInternalModuleButton.svelte';

	interface Props {
		moduleNodeId: string;
		closeModal: () => void;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	const { closeModal, moduleNodeId }: Props = $props();

	function handleInternalModuleSelect(internalModule: InternalModule) {
		const addNodeCommand = new SetModuleNodeTargetInternalModuleIdCommand({
			id: createId(),
			type: 'SetModuleNodeTargetInternalModuleIdCommand',
			details: {
				targetInternalModuleId: internalModule.id,
				moduleNodeId: moduleNodeId,
			},
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}
</script>

<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline outline-1 outline-zinc-800"
>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<BasicList
			{getId}
			{getName}
			onClick={handleInternalModuleSelect}
			values={graphContext.graph.internalModules.values()}
		/>
		<CreateInternalModuleButton
			class="common-button"
			onInternalModuleCreated={handleInternalModuleSelect}
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
