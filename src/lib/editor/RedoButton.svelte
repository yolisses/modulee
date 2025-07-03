<script lang="ts">
	import { RedoCommand } from '$lib/commands/editor/RedoCommand';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { editorContextKey } from './editorContext';
	import { getShortcutStringForCommandType } from './getShortcutStringForCommandType.svelte';

	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleClick() {
		const lastCommand = editorContext.editor.undoneHistory.at(-1);
		if (!lastCommand) return;
		const command = new RedoCommand({
			id: createId(),
			type: 'RedoCommand',
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	const shortcutString = getShortcutStringForCommandType('RedoActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title="Redo {shortcutString}"
	disabled={!editorContext.editor.getCanRedo()}
>
	<Fa fw icon={faRedo} />
</button>
