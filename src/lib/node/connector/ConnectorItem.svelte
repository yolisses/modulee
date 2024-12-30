<script lang="ts">
	import type { Connector } from './Connector.svelte';

	interface Props {
		connector: Connector;
	}

	let { connector }: Props = $props();
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
