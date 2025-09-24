<script lang="ts">
	import { ConnectorJoint as ConnectorJointBase, type Connector } from 'nodes-editor';

	interface Props {
		color: string;
		connector: Connector;
	}

	const { connector, color }: Props = $props();
</script>

<ConnectorJointBase connectorId={connector.id}>
	<div
		style:width="0.4lh"
		style:height="0.4lh"
		style:background-color={color}
		class="flex shrink-0 cursor-pointer items-center justify-center rounded-full"
	></div>
</ConnectorJointBase>
