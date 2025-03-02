<script lang="ts">
	import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import type { Contexts } from '$lib/shortcut/contexts';
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const actionCommand = new RedoActionCommand();
		// TODO find a more type safe way of doing this
		actionCommand.execute({
			editorContext,
			projectDataContext,
		} as Contexts);
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
