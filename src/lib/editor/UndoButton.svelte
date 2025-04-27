<script lang="ts">
	import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';
	import { getShortcutStringForCommandType } from './getShortcutStringForCommandType.svelte';

	const editorContext = getEditorContext();
	const contextsContext = getContextsContext();

	function handleClick() {
		const actionCommand = new UndoActionCommand();
		actionCommand.execute(contextsContext.contexts);
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
