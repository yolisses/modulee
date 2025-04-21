<script lang="ts">
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import HomeButton from '$lib/home/HomeButton.svelte';
	import GroupNodesButton from '$lib/module/internalModule/GroupNodesButton.svelte';
	import BackButton from '$lib/ui/BackButton.svelte';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
</script>

<div class="flex flex-row items-start overflow-auto border-b-2 border-black/50">
	<HomeButton />
	<UndoButton />
	<RedoButton />
	<ZoomInButton />
	<ZoomOutButton />
	<GroupNodesButton />
	<BackButton />
	<MuteButton />
</div>
