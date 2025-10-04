<script lang="ts">
	import type { Input } from '$lib/input/Input';
	import { ModuleNodeAudioInput } from '$lib/input/ModuleNodeAudioInput';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

<button
	title={input.name}
	style:padding-left="0.3lh"
	class:italic={input instanceof ModuleNodeAudioInput}
	class="flex flex-1 overflow-hidden text-start italic hover:bg-white/10"
>
	<div class="overflow-and-ellipsis">
		{input.name}
	</div>
	{#if input.targetNode?.name}
		<div class="overflow-and-ellipsis text-end opacity-25" style:padding-right="0.2lh">
			{input.targetNode.name}
		</div>
	{/if}
</button>
