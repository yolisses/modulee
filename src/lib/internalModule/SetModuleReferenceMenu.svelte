<script lang="ts">
	import { SetModuleNodeModuleReferenceCommand } from '$lib/commands/node/SetModuleNodeModuleReferenceCommand';
	import { createId } from '$lib/data/createId.js';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { InternalModuleData } from '$lib/data/InternalModuleData';
	import type { InternalModuleReference } from '$lib/data/InternalModuleReference';
	import type { ModuleReference } from '$lib/data/ModuleReference';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import CreateInternalModuleButton from './CreateInternalModuleButton.svelte';

	interface Props {
		moduleNodeId: string;
		closeModal: () => void;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	const { closeModal, moduleNodeId }: Props = $props();

	function handleSelectModule(moduleReference: ModuleReference) {
		const addNodeCommand = new SetModuleNodeModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			details: { moduleNodeId, moduleReference },
			type: 'SetModuleNodeModuleReferenceCommand',
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}

	function getInternalModuleReference(
		internalModuleData: InternalModuleData,
	): InternalModuleReference {
		return { id: internalModuleData.id, type: 'internal' };
	}

	const moduleReferences: ModuleReference[] = $derived(
		graphContext.graph.internalModules.values().map(getInternalModuleReference),
	);

	function getName(moduleReference: ModuleReference) {
		return graphContext.graph.internalModules.get(moduleReference.id).name;
	}

	function handleInternalModuleCreated(internalModule: InternalModule) {
		const internalModuleReference = getInternalModuleReference(internalModule);
		handleSelectModule(internalModuleReference);
	}
</script>

<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline outline-1 outline-zinc-800"
>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<BasicList {getId} {getName} values={moduleReferences} onClick={handleSelectModule} />
		<CreateInternalModuleButton
			class="common-button"
			onInternalModuleCreated={handleInternalModuleCreated}
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
