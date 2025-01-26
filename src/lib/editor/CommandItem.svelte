<script lang="ts">
	import type { Command } from './Command.js';

	interface Props {
		command: Command;
	}

	const { command }: Props = $props();
</script>

<!-- {command.constructor.name} -->
<div class="bg-zinc-500">
	{command.id.slice(0, 6)}
</div>
