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
	import { getSelectedTabContext } from './selectedTabContext';

	const graphContext = getGraphContext();
	const selectedTabContext = getSelectedTabContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick(group: Group) {
		selectedTabContext.selectedTab = 'group';
	}

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
		return `/projects/${projectDataContext.projectData.id}/${group.id}`;
	}
</script>

<div class="flex flex-col">
	<CreateGroupButton />
	<BasicLinkList
		{getId}
		{getLink}
		{getName}
		onClick={handleClick}
		onDelete={handleDelete}
		values={graphContext.graph.groups.values()}
	/>
</div>
