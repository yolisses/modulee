<script lang="ts">
	import type { ModuleNodeAudioInput } from '$lib/input/ModuleNodeAudioInput';

	interface Props {
		audioInput: ModuleNodeAudioInput;
	}

	const { audioInput }: Props = $props();
</script>

<div class="relative flex flex-1 flex-row items-center overflow-hidden">
	<div
		title={audioInput.name}
		style:padding-left="0.3lh"
		class="overflow-and-ellipsis flex-1 overflow-hidden italic hover:bg-white/10"
	>
		{audioInput.name}
	</div>
</div>
