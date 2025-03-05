<script lang="ts">
	import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const contextsContext = getContextsContext();

	function handleClick() {
		const actionCommand = new RedoActionCommand();
		actionCommand.execute(contextsContext.contexts);
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
