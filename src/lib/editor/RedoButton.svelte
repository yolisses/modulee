<script lang="ts">
	import { RedoCommand } from '$lib/commands/RedoCommand';
	import { createId } from '$lib/data/createId';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { createCommand } from './createCommand';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();

	function handleClick() {
		const lastCommand = editorContext.editor.undoneHistory.at(-1);
		if (!lastCommand) return;

		const redoCommand = new RedoCommand({
			id: createId(),
			type: 'RedoCommand',
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
			details: { commandId: lastCommand.id },
		});
		redoCommand.createCommandCallback = createCommand;

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
