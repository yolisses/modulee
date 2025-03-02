<script lang="ts">
	import { createEditorCommand } from '$lib/commands/createEditorCommand';
	import { UndoCommand } from '$lib/commands/editor/UndoCommand';
	import { createId } from '$lib/data/createId';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const lastCommand = editorContext.editor.history.at(-1);
		if (!lastCommand) return;

		const undoCommand = new UndoCommand({
			id: createId(),
			type: 'UndoCommand',
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
			projectId: projectDataContext.projectData.id,
		});
		undoCommand.createCommandCallback = createEditorCommand;

		editorContext.editor.execute(undoCommand);
	}
</script>

<button
	title="Undo"
	class="common-button"
	onclick={handleClick}
	disabled={!editorContext.editor.getCanUndo()}
>
	<Fa icon={faUndo} />
</button>
