<script lang="ts">
	import { getColorFromId } from '$lib/connection/getColorFromId';
	import type { Input } from '$lib/input/Input';
	import { InputWithControl } from '$lib/input/InputWithControl';
	import {
		EndConnectorAreaPointerStrategy,
		PointerEventDispatcher,
		StartConnectorAreaPointerStrategy,
	} from 'nodes-editor';
	import { connectorCondition } from './connectorCondition';
	import ConnectorJoint from './ConnectorJoint.svelte';
	import InputItemAutoButton from './InputItemAutoButton.svelte';
	import InputItemName from './InputItemName.svelte';
	import InputItemValueSlider from './InputItemValueSlider.svelte';

	interface Props {
		input: Input;
		isLast: boolean;
	}

	const { input, isLast }: Props = $props();
	const startConnectorAreaPointerStrategy = new StartConnectorAreaPointerStrategy(input);
	let sizeElement = $state<HTMLElement>();
	const endConnectorAreaPointerStrategy = new EndConnectorAreaPointerStrategy(
		input,
		connectorCondition,
	);
</script>

<PointerEventDispatcher class="contents" pointerStrategy={endConnectorAreaPointerStrategy}>
	<div class="relative h-0 w-0" style:left="-0.2lh" style:top="0.35lh">
		<ConnectorJoint
			connector={input}
			color={getColorFromId(input.targetNode?.id ?? input.node.id)}
		/>
	</div>
	<div
		bind:this={sizeElement}
		style:border-radius={isLast ? '0 0 0.4lh 0.4lh' : undefined}
		class="relative z-0 flex flex-row items-center overflow-hidden"
	>
		<PointerEventDispatcher class="contents" pointerStrategy={startConnectorAreaPointerStrategy}>
			<InputItemName {input} />
		</PointerEventDispatcher>
		{#if !input.targetNode && input instanceof InputWithControl}
			{#if input?.getIsAutoConnected()}
				<InputItemAutoButton {input} />
			{:else}
				<InputItemValueSlider {input} {sizeElement} color={getColorFromId(input.node.id)} />
			{/if}
		{/if}
	</div>
</PointerEventDispatcher>
