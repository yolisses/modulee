<script lang="ts">
	import { ZoomOutContextualCommand } from '$lib/shortcut/ZoomOutContextualCommand.svelte';
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const command = new ZoomOutContextualCommand();

	function handleClick() {
		command.execute();
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom out">
	<Fa icon={faMagnifyingGlassMinus} />
</button>
