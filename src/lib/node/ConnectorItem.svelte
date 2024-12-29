<script lang="ts">
	import type { Connector } from './Connector';

	let { connector }: { connector: Connector } = $props();
</script>

<div class="flex-row items-center gap-2 whitespace-nowrap">
	<div class="h-4 w-4 shrink-0 rounded-full bg-green-500"></div>
	<div>{connector.name}</div>
</div>
