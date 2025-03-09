<script lang="ts">
	import { RemoveGroupCommand } from '$lib/commands/group/RemoveGroupCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import CreateGroupButton from '$lib/group/CreateGroupButton.svelte';
	import ImportGroupButton from '$lib/import/ImportGroupButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleDelete(group: Group) {
		const command = new RemoveGroupCommand({
			id: createId(),
			type: 'RemoveGroupCommand',
			createdAt: new Date().toJSON(),
			details: { groupId: group.id },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	function getHref(group: Group) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/groups/${group.id}`;
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row gap-2 p-2">
		<CreateGroupButton class="primary-button" />
		<ImportGroupButton />
	</div>
	<BasicList {getId} {getName} {getHref} values={graphContext.graph.groups.values()}>
		{#snippet buttons(group)}
			<button class="common-button" onclick={() => handleDelete(group)}>Delete</button>
		{/snippet}
	</BasicList>
</div>
