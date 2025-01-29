<script lang="ts">
	import { faUndo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();

	function handleClick() {
		editorContext.editor.undo();
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
