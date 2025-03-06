<script lang="ts">
	import { RemoveGroupCommand } from '$lib/commands/group/RemoveGroupCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import CreateGroupButton from '$lib/group/CreateGroupButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicLinkList from '$lib/ui/BasicLinkList.svelte';
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

	function getLink(group: Group) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/groups/${group.id}`;
	}
</script>

<div class="flex flex-col">
	<div class="p-2">
		<CreateGroupButton />
	</div>
	<BasicLinkList
		{getId}
		{getLink}
		{getName}
		onDelete={handleDelete}
		values={graphContext.graph.groups.values()}
	/>
</div>
