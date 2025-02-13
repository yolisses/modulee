<script lang="ts">
	import { SetGroupTypeCommand } from '$lib/commands/group/SetGroupTypeCommand';
	import { createId } from '$lib/data/createId';
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleChange(e: Event & { currentTarget: HTMLSelectElement }) {
		const type = e.currentTarget.value;
		const command = new SetGroupTypeCommand({
			id: createId(),
			type: 'SetGroupTypeCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				type,
				groupId: group.id,
			},
		});
		editorContext.editor.execute(command);
	}
</script>

<select onchange={handleChange} class="hover-bg rounded border border-white/10 bg-zinc-900 p-2">
	<option class="bg-zinc-800" value="common">Common</option>
	<option class="bg-zinc-800" value="voice">Voice</option>
</select>
