<script lang="ts">
	import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';
	import { getShortcutStringForCommandType } from './getShortcutStringForCommandType.svelte';

	const editorContext = getEditorContext();
	const contextsContext = getContextsContext();

	function handleClick() {
		const actionCommand = new RedoActionCommand();
		actionCommand.execute(contextsContext.contexts);
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
