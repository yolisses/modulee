<script lang="ts">
	import type { InputWithControl } from '$lib/input/InputWithControl';

	interface Props {
		input: InputWithControl;
	}

	const { input }: Props = $props();
</script>

<button
	style:padding-right="0.3lh"
	class="flex-1 justify-end opacity-50 hover:bg-white/10"
	title="Using automatic value.&#013;Double click to use manual value.">auto</button
>
