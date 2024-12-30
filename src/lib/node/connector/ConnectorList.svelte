<script lang="ts">
	import type { Connector } from './Connector.svelte';
	import ConnectorItem from './ConnectorItem.svelte';

	interface Props {
		connectors: Connector[];
	}

	let { connectors }: Props = $props();
</script>

{#each connectors as connector (connector.id)}
	<ConnectorItem {connector} />
{/each}
