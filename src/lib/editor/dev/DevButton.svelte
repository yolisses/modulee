<script lang="ts">
	let element: Element;

	function handleClick() {
		console.log('click');
		window.__JUCE__.backend.emitEvent('passSomeString', {
			someString: 'hello, world',
		});
	}
</script>

<button class="common-button" bind:this={element} onclick={handleClick}>send event</button>
