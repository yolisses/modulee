<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import { ConnectorAreaPointerStrategy, PointerEventDispatcher } from 'nodes-editor';
	import { ConnectorCondition } from './ConnectorCondition';
	import ConnectorJoint from './ConnectorJoint.svelte';
	import { formatNumber } from './formatNumber';

	interface Props {
		input: Input;
		isLast: boolean;
	}

	const min = 0;
	const max = 1;
	const value = Math.random();
	const ratio = (value - min) / (max - min);
	const percentage = 100 * ratio;

	const { input, isLast }: Props = $props();
	const connectorCondition = new ConnectorCondition();

	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		input.id,
		connectorCondition.endConnectorCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<div class="relative h-0 w-0" style:left="-0.2lh" style:top="0.35lh">
		<ConnectorJoint connector={input} />
	</div>
	<div
		class="relative flex flex-row items-center overflow-hidden hover:bg-white/10"
		style:border-radius={isLast ? '0 0 0.4lh 0.4lh' : undefined}
	>
		<!-- TODO hide the input bar if there's a connection to the input -->
		<div style:width={percentage + '%'} class="absolute left-0 h-full bg-green-500/25"></div>
		<div class="relative flex flex-1 flex-row items-center overflow-hidden">
			<div
				title={input.name}
				style:margin-left="0.3lh"
				class="overflow-and-ellipsis flex-1 overflow-hidden"
			>
				{input.name}
			</div>
			<div class="opacity-50">{formatNumber(value)}</div>
		</div>
	</div>
</PointerEventDispatcher>
