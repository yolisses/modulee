<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { RoundConverter } from '$lib/space/RoundConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import NodeList from './NodeList.svelte';
	import ZoomInButton from './zoom/ZoomInButton.svelte';
	import ZoomOutButton from './zoom/ZoomOutButton.svelte';

	let zoom = $state(20);

	const editor = new Editor();

	const dataMinimumPosition = new Vector(-2, -1);
	const space = $derived(
		new Space([
			new RoundConverter(),
			new OffsetConverter(dataMinimumPosition.negate()),
			new ZoomConverter(zoom),
		]),
	);
</script>

<div class="flex-row">
	<UndoButton {editor} />
	<RedoButton {editor} />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
</div>
<NodeList {editor} {space} {dataMinimumPosition} />
