<script lang="ts">
	import { RenameGroupCommand } from '$lib/commands/group/RenameGroupCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import type { InputBlurEvent } from '$lib/utils/InputBlurEvent';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();

	const group = $derived(graphContext.graph.groups.get(groupIdContext.groupId));

	// TODO prevent command if name don't change
	function handleBlur(e: InputBlurEvent) {
		const { editor } = editorContext;
		const value = e.currentTarget.value;
		const command = new RenameGroupCommand({
			id: createId(),
			type: 'RenameGroupCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: { name: value, groupId: groupIdContext.groupId },
		});
		editor.execute(command);
	}
</script>

<div class="flex flex-col items-stretch gap-2 p-2">
	<label class="flex flex-col">
		Name
		<input
			type="text"
			value={group.name}
			onblur={handleBlur}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
</div>
