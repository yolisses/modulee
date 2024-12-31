<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Connector } from './Connector.svelte';
	import ConnectorItem from './ConnectorItem.svelte';

	interface Props {
		space: Space;
		connectors: Connector[];
	}

	let { space, connectors }: Props = $props();
</script>

{#each connectors as connector (connector.id)}
	<ConnectorItem {space} {connector} />
{/each}
