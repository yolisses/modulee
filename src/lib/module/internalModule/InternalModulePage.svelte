<script lang="ts">
	import { RenameInternalModuleCommand } from '$lib/commands/internalModule/RenameInternalModuleCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { InputBlurEvent } from '$lib/utils/InputBlurEvent';
	import { internalModuleIdContextKey } from './internalModuleIdContext';

	const graphContext = getRequiredContext(graphContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);

	const internalModule = $derived(
		graphContext.graph.internalModules.get(internalModuleIdContext.internalModuleId),
	);

	// TODO prevent command if name don't change
	function handleBlur(e: InputBlurEvent) {
		const { editor } = editorContext;
		const value = e.currentTarget.value;
		const command = new RenameInternalModuleCommand({
			id: createId(),
			type: 'RenameInternalModuleCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: { name: value, internalModuleId: internalModuleIdContext.internalModuleId },
		});
		editor.execute(command);
	}
</script>

<ListPageLayout title="Internal Module">
	<div class="flex flex-col items-stretch gap-2 p-2">
		<label class="flex flex-col">
			Name
			<input
				type="text"
				value={internalModule.name}
				onblur={handleBlur}
				class="rounded border border-white/10 bg-transparent p-2"
			/>
		</label>
	</div>
</ListPageLayout>
