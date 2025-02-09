<script lang="ts">
	import type { Connector } from '$lib/data/Connector';
	import { Input } from '$lib/data/Input.svelte';
	import { Output } from '$lib/data/Output.svelte';
	import { ConnectorJoint as ConnectorJointBase } from 'nodes-editor';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();

	function getDirection(connector: Connector) {
		if (connector instanceof Input) return -1;
		if (connector instanceof Output) return 1;
		return 0;
	}
</script>

<div class="relative" style:left={0.25 * getDirection(connector) + 'lh'}>
	<ConnectorJointBase connectorId={connector.id}>
		<div
			style:width="0.4lh"
			style:height="0.4lh"
			class="flex shrink-0 items-center justify-center rounded-full bg-green-500"
		></div>
	</ConnectorJointBase>
</div>
