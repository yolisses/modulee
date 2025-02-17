<script lang="ts">
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import BackButton from '$lib/group/BackButton.svelte';
	import GroupNodesButton from '$lib/group/GroupNodesButton.svelte';
	import LateralBarVisibilityButton from '$lib/lateralBar/LateralBarVisibilityButton.svelte';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		zoom: number;
		topBarChildren?: Snippet;
	}

	let { zoom = $bindable(), topBarChildren }: Props = $props();
</script>

<div class="flex flex-row border-b border-black">
	<HomeButton />
	<UndoButton />
	<RedoButton />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
	<GroupNodesButton />
	<BackButton />
	<MuteButton />
	<div class="flex-1"></div>
	<LateralBarVisibilityButton />
</div>
