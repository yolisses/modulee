<script lang="ts">
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
</script>

<div class="flex flex-row items-start overflow-auto border-t-2 border-black/50">
	<UndoButton />
	<RedoButton />
	<MuteButton />
</div>
