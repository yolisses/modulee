<script lang="ts">
	import { UndoCommand } from '$lib/commands/editor/UndoCommand';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { editorContextKey } from './editorContext';
	import { getShortcutStringForCommandType } from './getShortcutStringForCommandType.svelte';

	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleClick() {
		const lastCommand = editorContext.editor.history.at(-1);
		if (!lastCommand) return;
		const command = new UndoCommand({
			id: createId(),
			type: 'UndoCommand',
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	const shortcutString = getShortcutStringForCommandType('UndoActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title="Undo {shortcutString}"
	disabled={!editorContext.editor.getCanUndo()}
>
	<Fa fw icon={faUndo} />
</button>
