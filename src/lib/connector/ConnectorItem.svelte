<script lang="ts">
	import { ConnectorArea } from 'nodes-editor';
	import type { Connector } from '../data/Connector.js';
	import ConnectorJoint from './ConnectorJoint.svelte';
	import { endConnectorCondition } from './endConnectorCondition.js';

	interface Props {
		connector: Connector;
		direction: 'left' | 'right';
	}

	const { connector, direction }: Props = $props();
</script>

<ConnectorArea {connector} {endConnectorCondition}>
	<div
		class:flex-row={direction === 'left'}
		class:flex-row-reverse={direction === 'right'}
		class="relative flex items-center hover:bg-white/10"
	>
		<ConnectorJoint {connector} />
		{connector.name}
	</div>
</ConnectorArea>
