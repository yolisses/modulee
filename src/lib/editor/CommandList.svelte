<script lang="ts">
	import type { Command } from './Command.js';
	import CommandItem from './CommandItem.svelte';

	interface Props {
		commands: Command[];
	}

	const { commands }: Props = $props();
</script>

<div class="min-w-20 border">
	{#each commands as command (command.id)}
		<CommandItem {command} />
	{/each}
</div>
