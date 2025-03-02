<script lang="ts">
	import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import type { Contexts } from '$lib/shortcut/contexts';
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const actionCommand = new UndoActionCommand();
		// TODO find a more type safe way of doing this
		actionCommand.execute({
			editorContext,
			projectDataContext,
		} as Contexts);
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
