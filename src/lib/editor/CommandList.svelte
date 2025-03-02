<script lang="ts">
	import type { Command } fromEditorCommandmand.js';
	import CommandItem from './CommandItem.svelte';

	interface Props {
		commands: Command[];
	}

EditorCommand{ commands }: Props = $props();
</script>

<div class="min-w-20 border">
	{#each commands as command (command.id)}
		<CommandItem {command} />
	{/each}
</div>
