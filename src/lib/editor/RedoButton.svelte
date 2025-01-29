<script lang="ts">
	import { faRedo } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getEditorContext } from './editorContext';

	const editorContext = getEditorContext();

	function handleClick() {
		editorContext.editor.redo();
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
