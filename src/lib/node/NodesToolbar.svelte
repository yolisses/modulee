<script lang="ts">
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import HomeButton from '$lib/home/HomeButton.svelte';
	import GroupNodesButton from '$lib/module/internalModule/GroupNodesButton.svelte';
	import ToggleIsSidebarVisibleButton from '$lib/sidebar/ToggleIsSidebarVisibleButton.svelte';
	import BackButton from '$lib/ui/BackButton.svelte';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		topBarChildren?: Snippet;
	}

	let { topBarChildren }: Props = $props();
</script>

<div class="flex flex-row items-start border-b-2 border-black/50">
	<div class="flex flex-1 flex-row overflow-auto">
		<HomeButton />
		<UndoButton />
		<RedoButton />
		<ZoomInButton />
		<ZoomOutButton />
		<GroupNodesButton />
		<BackButton />
		<MuteButton />
	</div>
	<ToggleIsSidebarVisibleButton />
</div>
