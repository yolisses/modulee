<script lang="ts">
	import type { Command } from './Command';
	import CommandItem from './CommandItem.svelte';

	interface Props {
		commands: Command[];
	}

	const { commands }: Props = $props();
</script>

<div>
	{#each commands as command (command.id)}
		<CommandItem {command} />
	{/each}
</div>
