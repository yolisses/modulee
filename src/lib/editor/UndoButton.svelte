<script lang="ts">
	import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const contextsContext = getContextsContext();

	function handleClick() {
		const actionCommand = new UndoActionCommand();
		actionCommand.execute(contextsContext.contexts);
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
