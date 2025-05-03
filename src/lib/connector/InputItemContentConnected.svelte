<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

<div
	title={input.name}
	style:margin-left="0.3lh"
	class="overflow-and-ellipsis flex-1 overflow-hidden"
>
	{input.name}
</div>
