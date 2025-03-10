<script lang="ts">
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import BackButton from '$lib/internalModule/BackButton.svelte';
	import InternalModuleNodesButton from '$lib/internalModule/InternalModuleNodesButton.svelte';
	import ToggleIsSidebarVisibleButton from '$lib/sidebar/ToggleIsSidebarVisibleButton.svelte';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		topBarChildren?: Snippet;
	}

	let { topBarChildren }: Props = $props();
</script>

<div class="flex flex-row items-start border-b border-black">
	<div class="flex flex-1 flex-row overflow-auto">
		<HomeButton />
		<UndoButton />
		<RedoButton />
		<ZoomInButton />
		<ZoomOutButton />
		<InternalModuleNodesButton />
		<BackButton />
		<MuteButton />
	</div>
	<ToggleIsSidebarVisibleButton />
</div>
