<script lang="ts">
	import {
		ConnectorJoint as ConnectorJointBase,
		PointerEventDispatcher,
		StartConnectorAreaPointerStrategy,
		type Connector,
	} from 'nodes-editor';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
	const startConnectorAreaPointerStrategy = new StartConnectorAreaPointerStrategy(connector);
</script>

<PointerEventDispatcher pointerStrategy={startConnectorAreaPointerStrategy}>
	<ConnectorJointBase connectorId={connector.id}>
		<div
			style:width="0.4lh"
			style:height="0.4lh"
			class="flex shrink-0 items-center justify-center rounded-full bg-green-500"
		></div>
	</ConnectorJointBase>
</PointerEventDispatcher>
