<script lang="ts">
	import type { Input } from '$lib/input/Input';
	import { InputWithControl } from '$lib/input/InputWithControl';
	import { ModuleNodeAudioInput } from '$lib/input/ModuleNodeAudioInput';
	import { ConnectorAreaPointerStrategy, PointerEventDispatcher } from 'nodes-editor';
	import AudioInputItemContentUnconnected from './AudioInputItemContentUnconnected.svelte';
	import { connectorCondition } from './connectorCondition';
	import ConnectorJoint from './ConnectorJoint.svelte';
	import InputItemContentConnected from './InputItemContentConnected.svelte';
	import InputItemContentUnconnected from './InputItemContentUnconnected.svelte';

	interface Props {
		input: Input;
		isLast: boolean;
	}

	const { input, isLast }: Props = $props();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(input, connectorCondition);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<div class="relative h-0 w-0" style:left="-0.2lh" style:top="0.35lh">
		<ConnectorJoint connector={input} />
	</div>
	<div
		class="relative flex flex-row items-center overflow-hidden"
		style:border-radius={isLast ? '0 0 0.4lh 0.4lh' : undefined}
	>
		{#if input.targetNode}
			<InputItemContentConnected {input} />
		{:else if input instanceof ModuleNodeAudioInput}
			<AudioInputItemContentUnconnected audioInput={input} />
		{:else if input instanceof InputWithControl}
			<InputItemContentUnconnected {input} />
		{/if}
	</div>
</PointerEventDispatcher>
