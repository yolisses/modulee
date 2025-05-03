<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte';
	import { formatNumber } from './formatNumber';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();

	const { min, max } = input.inputDefinition;
	const value = input.inputDefinition.defaultValue;
	const ratio = (value - min) / (max - min);
	const percentage = 100 * ratio;
</script>

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
