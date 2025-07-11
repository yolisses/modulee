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
	style:padding-left="0.2lh"
	class:italic={input instanceof ModuleNodeAudioInput}
	class="overflow-and-ellipsis block flex-1 overflow-hidden text-start italic hover:bg-white/10"
>
	{input.name}
</button>
