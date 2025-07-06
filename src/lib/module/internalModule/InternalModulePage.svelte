<script lang="ts">
	import { RenameInternalModuleCommand } from '$lib/commands/internalModule/RenameInternalModuleCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { InputBlurEvent } from '$lib/utils/InputBlurEvent';
	import { internalModuleContextKey } from './internalModuleContext';

	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const internalModuleContext = getRequiredContext(internalModuleContextKey);

	// TODO prevent command if name don't change
	function handleBlur(e: InputBlurEvent) {
		const { editor } = editorContext;
		const value = e.currentTarget.value;
		const command = new RenameInternalModuleCommand({
			id: createId(),
			type: 'RenameInternalModuleCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: { name: value, internalModuleId: internalModuleContext.internalModule.id },
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
				onblur={handleBlur}
				value={internalModuleContext.internalModule.name}
				class="rounded border border-white/10 bg-transparent p-2"
			/>
		</label>
	</div>
</ListPageLayout>
