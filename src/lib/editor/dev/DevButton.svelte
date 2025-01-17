<script lang="ts">
	import { getNodesEngineData } from '$lib/engine/getNodesEngineData';
	import type { Editor } from '../Editor.svelte';

	interface Props {
		editor: Editor;
	}

	let { editor }: Props = $props();

	function handleClick() {
		const nodesEngineData = getNodesEngineData(editor.nodes);
		const nodesEngineDataJson = JSON.stringify(nodesEngineData);

		(window as any).__JUCE__.backend.emitEvent('graphChange', {
			nodesData: nodesEngineDataJson,
		});
	}
</script>

<button class="common-button" onclick={handleClick}>Send event</button>
