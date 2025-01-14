<script lang="ts">
	import { getNodeEngineData } from '$lib/engine/getNodeEngineData';
	import type { Editor } from '../Editor.svelte';

	interface Props {
		editor: Editor;
	}

	let { editor }: Props = $props();

	function handleClick() {
		console.log('click');
		const nodesEngineData = editor.nodes.map((node) => {
			return getNodeEngineData(node);
		});
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

<button class="common-button" onclick={handleClick}>send event</button>
