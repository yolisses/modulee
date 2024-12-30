<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Wire } from '$lib/wire/Wire';
	import WireItem from '$lib/wire/WireItem.svelte';
	import type { Connector } from './Connector';

	const {
		space,
		endConnector,
		startConnector,
	}: { space: Space; startConnector: Connector; endConnector: Connector } = $props();

	const wire: Wire = { startPosition: startConnector.position, endPosition: endConnector.position };
</script>

<WireItem {space} {wire} />
