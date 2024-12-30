<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Connector } from './Connector.svelte';
	import ConnectorItem from './ConnectorItem.svelte';

	let { space, connectors }: { space: Space; connectors: Connector[] } = $props();
</script>

{#each connectors as connector (connector.id)}
	<ConnectorItem {space} {connector} />
{/each}
