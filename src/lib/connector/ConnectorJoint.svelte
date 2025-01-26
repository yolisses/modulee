<script lang="ts">
	import type { Connector } from '$lib/data/Connector.js';
	import { ConnectorItem } from 'nodes-editor';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
</script>

<ConnectorItem {connector} />
<div
	style:width="0.8lh"
	style:height="0.8lh"
	style:margin="0.1lh"
	class="flex shrink-0 items-center justify-center rounded-full bg-green-500"
></div>
