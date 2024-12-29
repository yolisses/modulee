<script lang="ts">
	import type { Connector } from './Connector';
	import ConnectorItem from './ConnectorItem.svelte';

	let { connectors }: { connectors: Connector[] } = $props();
</script>

{#each connectors as connector (connector.id)}
	<ConnectorItem {connector} />
{/each}
