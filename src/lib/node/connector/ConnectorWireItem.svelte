<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import WireItem from '$lib/wire/WireItem.svelte';
	import type { Connector } from './Connector';

	const { connector, space }: { space: Space; connector: Connector } = $props();
</script>

<WireItem {space} />
