<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';

	const groupContext = getGroupIdContext();
	const editorContext = getEditorContext();

	const group = $derived(editorContext.editor.groups.get(groupContext.groupId));
</script>

<div class="flex flex-col items-stretch gap-2 p-2">
	<label class="flex flex-col">
		Name
		<input
			type="text"
			value={group.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
	<label class="flex flex-col">
		Type
		<select class="hover-bg rounded border border-white/10 bg-zinc-900 p-2">
			<option class="bg-zinc-800" value="common">Common</option>
			<option class="bg-zinc-800" value="common">Voice</option>
		</select>
	</label>
</div>
