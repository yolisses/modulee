<script lang="ts">
	import { createEditorCommand } from '$lib/commands/createEditorCommand';
	import { RedoCommand } from '$lib/commands/editor/RedoCommand';
	import { createId } from '$lib/data/createId';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const lastCommand = editorContext.editor.undoneHistory.at(-1);
		if (!lastCommand) return;

		const redoCommand = new RedoCommand({
			id: createId(),
			type: 'RedoCommand',
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
			projectId: projectDataContext.projectData.id,
		});
		redoCommand.createCommandCallback = createEditorCommand;

		editorContext.editor.execute(redoCommand);
	}
</script>

<button
	title="Redo"
	class="common-button"
	onclick={handleClick}
	disabled={!editorContext.editor.getCanRedo()}
>
	<Fa icon={faRedo} />
</button>
