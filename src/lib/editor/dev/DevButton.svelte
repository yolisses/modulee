<script lang="ts">
	let element: Element;

	function handleClick() {
		console.log('click');
		window.__JUCE__.backend.emitEvent('passSomeString', {
			someString: 'hello, world',
		});

		const devNodesData = `[
    {
        "id": 1,
        "type": "ConstantNode",
        "extras": {
            "value": 100
        }
    },
    {
        "id": 2,
        "type": "OutputNode",
        "input_ids": {
            "input": 1
        }
    }
]`;
		window.__JUCE__.backend.emitEvent('graphChange', {
			nodesData: devNodesData,
		});
	}
</script>

<button class="common-button" bind:this={element} onclick={handleClick}>send event</button>
