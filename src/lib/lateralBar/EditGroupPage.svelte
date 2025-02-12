<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';

	const groupContext = getGroupIdContext();
	const editorContext = getEditorContext();

	const group = $derived(editorContext.editor.groups.get(groupContext.groupId));
</script>

<input type="text" value={group.name} class="rounded bg-transparent p-2" />
