<script lang="ts">
	import { SetAutoConnectionInputCommand } from '$lib/commands/node/SetAutoConnectionInputCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { InputWithControl } from '$lib/input/InputWithControl';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';

	interface Props {
		input: InputWithControl;
	}

	const { input }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleDoubleClick() {
		const command = new SetAutoConnectionInputCommand({
			createdAt: new Date().toJSON(),
			details: { inputPath: input.inputPath, value: false },
			id: createId(),
			projectId: projectDataContext.projectData.id,
			type: 'SetAutoConnectionInputCommand',
		});
		editorContext.editor.execute(command);
	}
</script>

<button
	style:padding-right="0.2lh"
	ondblclick={handleDoubleClick}
	class="flex-1 justify-end opacity-50 hover:bg-white/10"
	title="Using automatic value.&#013;Double click to use manual value."
>
	auto
</button>
