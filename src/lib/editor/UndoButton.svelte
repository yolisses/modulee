<script lang="ts">
	import { UndoCommand } from '$lib/commands/UndoCommand';
	import { createId } from '$lib/data/createId';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { createCommand } from './createCommand';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();

	function handleClick() {
		const lastCommand = editorContext.editor.history.at(-1);
		if (!lastCommand) return;

		const undoCommand = new UndoCommand({
			id: createId(),
			type: 'UndoCommand',
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
			details: { commandId: lastCommand.id },
		});
		undoCommand.createCommandCallback = createCommand;

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
