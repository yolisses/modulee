<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import { ConnectorAreaPointerStrategy, PointerEventDispatcher } from 'nodes-editor';
	import { ConnectorCondition } from './ConnectorCondition';
	import ConnectorJoint from './ConnectorJoint.svelte';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
	const connectorCondition = new ConnectorCondition();

	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		input.id,
		connectorCondition.endConnectorCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<div class="relative flex flex-row items-center hover:bg-white/10">
		<div class="absolute" style:left="-0.2lh">
			<ConnectorJoint connector={input} />
		</div>
		<div style:padding-inline="0.4lh" class="overflow-and-ellipsis">
			{input.name}
		</div>
	</div>
</PointerEventDispatcher>
