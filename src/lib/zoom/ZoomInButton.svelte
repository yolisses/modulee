<script lang="ts">
	import { ZoomInContextualCommand } from '$lib/shortcut/ZoomInContextualCommand.svelte';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const command = new ZoomInContextualCommand();

	function handleClick() {
		command.execute();
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom in">
	<Fa icon={faMagnifyingGlassPlus} />
</button>
