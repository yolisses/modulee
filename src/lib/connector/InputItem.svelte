<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import ConnectorItem from './ConnectorItem.svelte';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

<ConnectorItem connector={input} direction="left" />
