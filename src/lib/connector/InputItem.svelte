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
		<ConnectorJoint connector={input} />
		{input.name}
	</div>
</PointerEventDispatcher>
