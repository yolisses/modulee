<script lang="ts">
	import { getNodesEngineData } from '$lib/engine/getNodesEngineData';
	import type { Editor } from '../Editor.svelte';

	interface Props {
		editor: Editor;
	}

	let { editor }: Props = $props();

	function handleClick() {
		console.log('click');
		const nodesEngineData = getNodesEngineData(editor.nodes);
		const nodesEngineDataJson = JSON.stringify(nodesEngineData);

		console.log(nodesEngineDataJson);

		window.__JUCE__.backend.emitEvent('passSomeString', {
			someString: 'hello, world',
		});

		window.__JUCE__.backend.emitEvent('graphChange', {
			nodesData: nodesEngineDataJson,
		});
	}
</script>

<button class="common-button" onclick={handleClick}>Send event</button>
