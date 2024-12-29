<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { getScreenUnit } from '$lib/utils/getScreenUnit';
	import type { Connector } from './Connector';

	let { space, connector }: { space: Space; connector: Connector } = $props();

	const screenUnit = getScreenUnit(space);
</script>

<div class="flex-row items-center whitespace-nowrap">
	<div
		class="shrink-0 rounded-full bg-green-500"
		style:width={(3 / 4) * screenUnit.x + 'px'}
		style:height={(3 / 4) * screenUnit.y + 'px'}
		style:margin={(1 / 2 / 4) * screenUnit.x + 'px'}
	></div>
	<div>{connector.name}</div>
</div>
