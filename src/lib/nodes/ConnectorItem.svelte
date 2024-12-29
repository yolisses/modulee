<script lang="ts">
	import type { Connector } from './Connector';

	let { connector }: { connector: Connector } = $props();
</script>

<div class="h-4 w-4 rounded-full bg-green-500">
	<div class="absolute">
		{connector.id}
	</div>
</div>
