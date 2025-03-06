<script lang="ts">
	import { AddGroupCommand } from '$lib/commands/group/AddGroupCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		onGroupCreated?: (group: Group) => void;
	}

	const { onGroupCreated }: Props = $props();

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleCreateClick() {
		const groupId = createId();
		const command = new AddGroupCommand({
			id: createId(),
			type: 'AddGroupCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				group: {
					id: groupId,
					name: 'New group',
				},
			},
		});
		editorContext.editor.execute(command);

		if (onGroupCreated) {
			const group = graphContext.graph.groups.get(groupId);
			onGroupCreated(group);
		}
	}
</script>

<button class="primary-button" onclick={handleCreateClick}>
	<Fa icon={faPlus} />
	Create group
</button>
