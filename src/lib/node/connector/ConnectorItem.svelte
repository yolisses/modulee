<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Connector } from './Connector.svelte';

	let { space, connector }: { space: Space; connector: Connector } = $props();
</script>

<div class="flex-row items-center whitespace-nowrap">
	<div
		class="shrink-0 rounded-full bg-green-500"
		style:width="0.9em"
		style:height="0.9em"
		style:margin="0.05em"
	></div>
	<div>{connector.name}</div>
</div>
