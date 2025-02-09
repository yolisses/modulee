<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import { ConnectorArea } from 'nodes-editor';
	import ConnectorJoint from './ConnectorJoint.svelte';
	import { endConnectorCondition } from './endConnectorCondition.js';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

<ConnectorArea connector={input} {endConnectorCondition}>
	<div class="relative flex flex-row items-center hover:bg-white/10">
		<ConnectorJoint connector={input} />
		{input.name}
	</div>
</ConnectorArea>
